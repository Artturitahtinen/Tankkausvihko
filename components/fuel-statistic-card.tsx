import { formatToUIDate } from '@/utils/date'
import { FuelStatistic } from '@/utils/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Card, IconButton, List } from 'react-native-paper'

type FuelStatisticCardProps = {
    statistic: FuelStatistic
    onEdit: (statistic: FuelStatistic) => void
    onDelete: (id: string | undefined) => void
}

export const FuelStatisticCard: React.FC<FuelStatisticCardProps> = ({
    statistic,
    onEdit,
    onDelete,
}) => {
    const getEurosPerLitre = (fuelStatistic: FuelStatistic) =>
        (fuelStatistic.price / fuelStatistic.fuelAmount).toFixed(2)

    const getLitresPer100kmFromPreviousStatistic = (
        fuelStatistic: FuelStatistic
    ) =>
        ((fuelStatistic.fuelAmount / fuelStatistic.kilometres) * 100).toFixed(2)

    return (
        <Card style={styles.card}>
            <Card.Title
                title={formatToUIDate(statistic?.date)}
                titleStyle={{ marginTop: 5 }}
                left={(props) => (
                    <Avatar.Icon
                        {...props}
                        icon='gas-station'
                        style={styles.icon}
                    />
                )}
                right={(props) => (
                    <View style={styles.actionIcons}>
                        <IconButton
                            {...props}
                            icon='pencil'
                            onPress={() => onEdit(statistic)}
                        />
                        <IconButton
                            {...props}
                            icon='delete'
                            onPress={() => onDelete(statistic.id)}
                        />
                    </View>
                )}
            />
            <Card.Content>
                <View style={styles.row}>
                    <List.Item
                        title='Hinta (€)'
                        description={`${statistic.price} €`}
                        style={styles.listItem}
                    />
                    <List.Item
                        title='Määrä'
                        description={`${statistic.fuelAmount} l`}
                        style={styles.listItem}
                    />
                </View>
                <View style={styles.row}>
                    <List.Item
                        title='Kilometrit'
                        description={`${statistic.kilometres} km`}
                        style={styles.listItem}
                    />
                    <List.Item
                        title='l/100km'
                        description={getLitresPer100kmFromPreviousStatistic(
                            statistic
                        )}
                        style={styles.listItem}
                    />
                </View>
                <View style={styles.row}>
                    <List.Item
                        title='Paikka'
                        description={statistic.place}
                        style={styles.listItem}
                    />
                    <List.Item
                        title='€/l'
                        description={getEurosPerLitre(statistic)}
                        style={styles.listItem}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        color: '#fff',
        marginBottom: 10,
        padding: 10,
    },
    icon: {
        backgroundColor: '#f0ad4e',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItem: {
        flex: 1,
    },
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
