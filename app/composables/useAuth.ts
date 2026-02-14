export const useAuth = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const router = useRouter()

    const loginWithProvider = async (provider: 'google' | 'github' | 'discord') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        })

        if (error) throw error
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/')
    }

    return {
        user,
        loginWithProvider,
        logout
    }
}
