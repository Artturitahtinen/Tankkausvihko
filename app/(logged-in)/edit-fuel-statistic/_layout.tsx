import { auth } from '@/firebaseConfig'
import { Stack } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Button } from 'react-native-paper'

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerRight: () => (
                    <Button onPress={() => signOut(auth)}>Kirjaudu ulos</Button>
                ),
                headerStyle: {
                    backgroundColor: '#f8f9fa', // Optional: Customize header background
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // Optional: Customize header title style
                },
            }}
        >
            <Stack.Screen
                name='[fuelStatisticId]'
                options={{
                    title: 'Muokkaa',
                    headerShown: true,
                }}
            />
        </Stack>
    )
}
