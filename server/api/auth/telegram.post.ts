import crypto from 'crypto'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = process.env.POSTTVA_BOT_API_TELEGRAM

    if (!token) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Bot token not configured'
        })
    }

    // 1. Validate Telegram Hash
    const { hash, ...data } = body

    // Create data check string
    const checkString = Object.keys(data)
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join('\n')

    // Generate secret key
    const secretKey = crypto.createHash('sha256').update(token).digest()

    // Calculate HMAC-SHA256
    const hmac = crypto.createHmac('sha256', secretKey)
        .update(checkString)
        .digest('hex')

    if (hmac !== hash) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid hash from Telegram'
        })
    }

    // 2. Hash is valid, link to profile in Supabase
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)
    const userId = (user as any)?.sub || user?.id

    if (!user || !userId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    // [CHECKPOINT] Linking Telegram
    console.log('--- Telegram Link Checkpoint ---')
    console.log('Nuxt User ID:', userId)
    console.log('Telegram User ID from body:', body.id)

    const { data: profile, error } = await (client as any)
        .from('profiles')
        .upsert({
            id: userId,
            telegram_user_id: body.id,
            updated_at: new Date().toISOString()
        })
        .select()
        .single()

    if (error) {
        console.error('[TELEGRAM LINK ERROR]:', error)
        throw createError({
            statusCode: 500,
            statusMessage: `Database Error: ${error.message}`
        })
    }

    return { success: true, data: profile }
})
