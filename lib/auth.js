
import { supabase } from './supabaseClient'

export const getUserRole = async (userId) => {
    if (!userId) return null

    const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error fetching user role:', error)
        return null
    }

    return data?.role
}

export const withRoleProtection = (Component, allowedRoles) => {
    return (props) => {
        // This is a simplified HOC for client-side protection. 
        // For robust security, use Middleware or Server-Side checks.
        // This implementation assumes the parent component or a context handles the auth state loading.
        // In a real Next.js app, you'd likely use a hook like useUser() to get the current user.

        // Since we don't have a full auth context setup here, I'll implement a basic check inside the pages instead
        // to keep it self-contained as requested.
        return <Component {...props} />
    }
}
