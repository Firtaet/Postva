import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<any>(event)
  const user = await serverSupabaseUser(event)
  const userId = (user as any)?.sub || user?.id

  if (!user || !userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const email = user.email?.trim().toLowerCase()
  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Account email is missing' })
  }

  const { data: existing, error: existingError } = await client
    .from('newsletter_subscribers')
    .select('id, email, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (existingError) {
    throw createError({ statusCode: 500, statusMessage: `Database Error: ${existingError.message}` })
  }

  if (existing) {
    return { success: true, already_subscribed: true, data: existing }
  }

  const { data, error } = await client
    .from('newsletter_subscribers')
    .insert({
      user_id: userId,
      email
    })
    .select('id, email, created_at')
    .single()

  if (error) {
    if ((error as any).code === '23505') {
      return { success: true, already_subscribed: true }
    }

    throw createError({ statusCode: 500, statusMessage: `Database Error: ${error.message}` })
  }

  return { success: true, already_subscribed: false, data }
})
