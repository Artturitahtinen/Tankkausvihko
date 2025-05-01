import { auth } from '@/firebaseConfig'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createContext, ReactNode, useContext, useState } from 'react'

type SessionContextType = {
    login: (email: string, password: string) => void
    logout: () => void
    session?: string | null
    isLoading: boolean
}

const SessionContext = createContext<SessionContextType>({
    login: (email, password) => null,
    logout: () => null,
    session: null,
    isLoading: false,
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [authErrorCode, setAuthErrorCode] = useState('')

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            const errorCode = error as FirebaseError
            console.log(errorCode)
        } finally {
            setIsLoading(true)
        }
    }

    return (
        <SessionContext.Provider
            value={{
                login: (email, password) => login(email, password),
                logout: () => {
                    console.log('not implemented yet')
                },
                session: 'not implemented yet',
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
