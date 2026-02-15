import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await serverSupabaseClient<any>(event)
    const user = await serverSupabaseUser(event)
    const userId = (user as any)?.sub || user?.id

    if (!user || !userId) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const { trade_link } = body

    const steamRegex = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/
    if (!steamRegex.test(trade_link)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректная ссылка на обмен. Проверьте формат.'
        })
    }
    const { count, error: countError } = await client
        .from('steam_gifts')
        .select('*', { count: 'exact', head: true })

    if (count && count >= 10) {
        throw createError({
            statusCode: 403,
            statusMessage: 'К сожалению, все 10 подарков уже забронированы. Акция завершена.'
        })
    }
    const { data: existing } = await client
        .from('steam_gifts')
        .select('id')
        .eq('user_id', userId)
        .single()

    if (existing) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Вы уже подали заявку на подарок.'
        })
    }
    console.log('--- Submission Checkpoint ---')
    console.log('User ID from Supabase Auth:', userId)
    console.log('Body trade link:', trade_link)
    const insertData = {
        user_id: userId,
        trade_link: trade_link,
        user_email: user.email
    }

    console.log('Attempting insert with:', insertData)

    const { data, error } = await client
        .from('steam_gifts')
        .insert(insertData)
        .select()
        .single()

    if (error) {
        console.error('[DATABASE ERROR]:', error)
        throw createError({
            statusCode: 500,
            statusMessage: `Database Error: ${error.message}`
        })
    }

    return { success: true, data }
})
