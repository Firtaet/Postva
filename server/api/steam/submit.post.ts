import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const { trade_link } = body

    // 1. Валидация ссылки
    const steamRegex = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/
    if (!steamRegex.test(trade_link)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректная ссылка на обмен. Проверьте формат.'
        })
    }

    // 2. Проверка лимита (10 заявок)
    const { count, error: countError } = await client
        .from('steam_gifts')
        .select('*', { count: 'exact', head: true })

    if (count && count >= 10) {
        throw createError({
            statusCode: 403,
            statusMessage: 'К сожалению, все 10 подарков уже забронированы. Акция завершена.'
        })
    }

    // 3. Проверка на дубликат (уже реализовано через unique в БД, но для красоты отловим тут)
    const { data: existing } = await client
        .from('steam_gifts')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (existing) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Вы уже подали заявку на подарок.'
        })
    }

    // 4. Вставка
    const { data, error } = await client
        .from('steam_gifts')
        .insert({
            user_id: user.id,
            trade_link: trade_link,
            user_email: user.email
        })
        .select()
        .single()

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    return { success: true, data }
})
