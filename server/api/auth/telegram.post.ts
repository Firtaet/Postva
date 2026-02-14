import crypto from 'crypto'

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

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const { data: profile, error } = await client
        .from('profiles')
        .upsert({
            id: user.id,
            telegram_user_id: body.id,
            updated_at: new Date().toISOString()
        })
        .select()
        .single()

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    return { success: true, data: profile }
})
