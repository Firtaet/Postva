import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<any>(event)
  const user = await serverSupabaseUser(event)
  const userId = (user as any)?.sub || user?.id

  if (!user || !userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { data, error } = await client
    .from('newsletter_subscribers')
    .select('id, email, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Database Error: ${error.message}` })
  }

  return {
    subscribed: !!data,
    email: data?.email || user.email || null,
    subscribed_at: data?.created_at || null
  }
})
