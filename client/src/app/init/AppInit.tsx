import { useRefreshMutation } from '@/features/auth/api/authApi'
import { refreshTried } from '../router/authCheckLoader'
import { useEffect } from 'react'

export function AppInit() {
    const [refresh] = useRefreshMutation()

    useEffect(() => {
        if (!refreshTried) {
            refresh(undefined)
        }
    }, [])

    return null
}
