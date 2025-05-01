import { auth } from '@/firebaseConfig'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Button } from 'react-native-paper'

export default function TabLayout() {
    return (
        <Tabs
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
            <Tabs.Screen
                name={'home'}
                options={{
                    title: 'Tankkaukset',
                    tabBarIcon: () => (
                        <FontAwesome6 name='gas-pump' size={24} />
                    ),
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name={'add-fuel-statistic'}
                options={{
                    title: 'Lisää tankkaus',
                    tabBarIcon: () => <Ionicons name='add' size={32} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}
