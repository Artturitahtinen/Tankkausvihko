import { auth } from '@/firebaseConfig'
import { router } from 'expo-router'
import { User } from 'firebase/auth'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

type SessionContextType = {
    user: User | null | undefined
    isLoading: boolean
}

const SessionContext = createContext<SessionContextType>({
    user: undefined,
    isLoading: false,
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const authStateChange = () => {
        setIsLoading(true)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            user ? setUser(user) : null
            if (!user?.emailVerified) {
                router.replace('/')
            }
        })
        setIsLoading(false)

        return unsubscribe
    }

    useEffect(authStateChange, [router])

    return (
        <SessionContext.Provider
            value={{
                user,
                isLoading,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export const useSessionProvider = (): SessionContextType => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider')
    }
    return context
}
