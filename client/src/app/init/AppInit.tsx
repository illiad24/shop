import { useRefreshMutation } from '@/features/auth/api/authApi'
import { refreshTried } from '../router/authCheckLoader'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function AppInit() {
    const [refresh] = useRefreshMutation()

    useEffect(() => {
        if (!refreshTried) {
            refresh(undefined)
        }
    }, [])
    const { i18n } = useTranslation()
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (
                e.key === 'i18nLanguage' &&
                e.newValue &&
                e.newValue !== i18n.language
            ) {
                i18n.changeLanguage(e.newValue)
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [i18n])

    return null
}
