import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export default () => {
    return (
        <Tabs>
            <Tabs.Screen
                name={'fuel-statistics'}
                options={{
                    title: 'Tankkaukset',
                    tabBarIcon: () => (
                        <FontAwesome6 name='gas-pump' size={24} />
                    ),
                    headerShown: false,
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
