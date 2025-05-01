import { ReactNode } from 'react'
import { SnackbarProvider } from './snackbar-provider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return <SnackbarProvider>{children}</SnackbarProvider>
}
