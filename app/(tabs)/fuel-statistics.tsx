import { StyleSheet, View } from 'react-native'
import { Chip } from 'react-native-paper'

export default function FuelStatistics() {
    return (
        <View style={styles.container}>
            <Chip
                selected
                showSelectedOverlay
                onPress={() => {}}
                style={styles.chip}
            >
                2021
            </Chip>
            <Chip
                selected
                showSelectedOverlay
                onPress={() => {}}
                style={styles.chip}
            >
                2022
            </Chip>
            <Chip
                selected
                showSelectedOverlay
                onPress={() => {}}
                style={styles.chip}
            >
                2023
            </Chip>
            <Chip
                selected
                showSelectedOverlay
                onPress={() => {}}
                style={styles.chip}
            >
                2024
            </Chip>
            <Chip
                selected
                showSelectedOverlay
                onPress={() => {}}
                style={styles.chip}
            >
                2025
            </Chip>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        margin: 4,
    },
})
