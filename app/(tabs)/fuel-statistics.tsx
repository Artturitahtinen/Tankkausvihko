import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { List } from 'react-native-paper'

export default function FuelStatistics() {
    return (
        <View style={styles.container}>
            <List.AccordionGroup>
                <List.Accordion
                    style={styles.accordion}
                    left={() => <FontAwesome6 name="gas-pump" size={24} />}
                    title="2025"
                    id="3"
                >
                    <FlatList
                        horizontal
                        data={[1, 2, 3]}
                        renderItem={({ item }) => (
                            <List.Item title={`Item ${item}`} />
                        )}
                        keyExtractor={(item) => item.toString()}
                    />
                    <FlatList
                        horizontal
                        data={[1, 2, 3]}
                        renderItem={({ item }) => (
                            <List.Item title={`Item ${item}`} />
                        )}
                        keyExtractor={(item) => item.toString()}
                    />
                </List.Accordion>
            </List.AccordionGroup>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginLeft: 20,
    },
    accordion: {
        paddingLeft: 20,
    },
})
