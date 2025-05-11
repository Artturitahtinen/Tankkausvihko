import { SessionProvider } from '@/context/session-provider'
import { SnackbarProvider } from '@/context/snackbar-provider'
import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

export default function StackLayout() {
    const theme = {
        ...DefaultTheme,
    }

    return (
        <PaperProvider theme={theme}>
            <SessionProvider>
                <SnackbarProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </SnackbarProvider>
            </SessionProvider>
        </PaperProvider>
    )
}
