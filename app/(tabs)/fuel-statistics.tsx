import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { formatToUIDate } from '../utils/helpers'
import { FuelStatistic } from '../utils/types'

export default function FuelStatistics() {
    const [fuelStatistics, setFuelStatistics] = useState<FuelStatistic[]>([
        {
            id: 1,
            place: 'Teboil Express',
            date: '2023-05-02',
            fuelAmount: 38.38,
            odometerReading: 45703,
            price: 74,
        },
        {
            id: 2,
            place: 'ABC Itäharju',
            date: '2023-06-05',
            fuelAmount: 35.7,
            odometerReading: 46320,
            price: 68.94,
        },
    ])

    const isFirstStatistic = (index: number) => index === 0

    const getEurosPerLitre = (fuelStatistic: FuelStatistic) =>
        (fuelStatistic.price / fuelStatistic.fuelAmount).toFixed(2)

    const getKilometresFromPreviousStatistic = (
        fuelStatistic: FuelStatistic,
        previousFuelStatistic: FuelStatistic
    ) =>
        previousFuelStatistic
            ? fuelStatistic.odometerReading -
              previousFuelStatistic.odometerReading
            : 0

    const getLitresPer100kmFromPreviousStatistic = (
        fuelStatistic: FuelStatistic,
        previousFuelStatistic: FuelStatistic
    ) =>
        (
            (fuelStatistic.fuelAmount /
                getKilometresFromPreviousStatistic(
                    fuelStatistic,
                    previousFuelStatistic
                )) *
            100
        ).toFixed(2)

    return (
        <View style={styles.container}>
            <DataTable>
                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{ flexDirection: 'column' }}
                    horizontal
                >
                    <DataTable.Header>
                        <DataTable.Title style={styles.tableTitle}>
                            Tankkauspvm
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            Hinta (€)
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            Määrä (l)
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            km
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            l/100km
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            Paikka
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableTitle}>
                            €/l
                        </DataTable.Title>
                    </DataTable.Header>
                    {fuelStatistics.map((statistic, index, statistics) => (
                        <DataTable.Row
                            style={styles.tableRow}
                            key={statistic.id}
                        >
                            <DataTable.Cell style={styles.tableCell}>
                                {formatToUIDate(statistic?.date)}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>
                                {statistic.price}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>
                                {statistic.fuelAmount}
                            </DataTable.Cell>
                            {
                                <DataTable.Cell style={styles.tableCell}>
                                    {isFirstStatistic(index)
                                        ? '-'
                                        : getKilometresFromPreviousStatistic(
                                              statistic,
                                              statistics[index - 1]
                                          )}
                                </DataTable.Cell>
                            }
                            <DataTable.Cell style={styles.tableCell}>
                                {isFirstStatistic(index)
                                    ? '-'
                                    : getLitresPer100kmFromPreviousStatistic(
                                          statistic,
                                          statistics[index - 1]
                                      )}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>
                                {statistic.place}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>
                                {getEurosPerLitre(statistic)}
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    tableTitle: {
        width: 100,
    },
    tableRow: {
        width: '100%',
        height: 50,
    },
    tableCell: {
        width: 100,
    },
    tableTitle: {
        width: 100,
    },
    tableRow: {
        flex: 1,
        width: '100%',
        height: 50,
    },
    tableCell: {
        width: 100,
    },
})
