import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<any>(event)
  const user = await serverSupabaseUser(event)
  const userId = (user as any)?.sub || user?.id

  if (!user || !userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { error } = await client
    .from('newsletter_subscribers')
    .delete()
    .eq('user_id', userId)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Database Error: ${error.message}` })
  }

  return { success: true }
})
