import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)

    const { count, error: countError } = await client
        .from('steam_gifts')
        .select('*', { count: 'exact', head: true })

    let userStatus = null
    if (user) {
        const { data } = await client
            .from('steam_gifts')
            .select('id, is_sent')
            .eq('user_id', user.id)
            .single()
        userStatus = data
    }

    return {
        total_count: count || 0,
        user_status: userStatus
    }
})
