import { auth } from '@/firebaseConfig'
import { Stack, useRouter } from 'expo-router'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function AuthLayout() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const initializeAuthListener = () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            if (isLoading) {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }

    const handleUnauthenticatedRedirect = () => {
        if (!isLoading && user === null) {
            router.replace('/')
        }
    }

    useEffect(initializeAuthListener, [])
    useEffect(handleUnauthenticatedRedirect, [isLoading, user])

    if (isLoading) {
        return null
    }

    return <Stack />
}
