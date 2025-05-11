import { useSessionProvider } from '@/context/session-provider'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
    const router = useRouter()
    const { user, isLoading } = useSessionProvider()

    const handleUnauthenticatedRedirect = () => {
        if (!isLoading && user === null) {
            router.replace('/')
        }
    }

    useEffect(handleUnauthenticatedRedirect, [isLoading, user])

    if (isLoading) {
        return null
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}
