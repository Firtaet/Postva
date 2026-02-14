export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = process.env.POSTTVA_BOT_API_TELEGRAM
    const { chat_id, text } = body

    if (!token) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Bot token not configured'
        })
    }

    if (!chat_id || !text) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing chat_id or text'
        })
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`
        const response: any = await $fetch(url, {
            method: 'POST',
            body: {
                chat_id,
                text,
                parse_mode: 'HTML'
            }
        })

        if (!response.ok) {
            throw createError({
                statusCode: 400,
                statusMessage: response.description || 'Failed to send message to Telegram'
            })
        }

        return { success: true, result: response.result }
    } catch (e: any) {
        throw createError({
            statusCode: e.statusCode || 500,
            statusMessage: e.statusMessage || 'Internal Server Error'
        })
    }
})
