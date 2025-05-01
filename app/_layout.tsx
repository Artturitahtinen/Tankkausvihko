import { SnackbarProvider } from '@/context/snackbar-provider'
import { Stack } from 'expo-router'

export default function StackLayout() {
    return (
        <SnackbarProvider>
            <Stack />
        </SnackbarProvider>
    )
}
