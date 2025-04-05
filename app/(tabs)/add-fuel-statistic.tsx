import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FuelStatistic } from '../utils/types'
import { DatePickerInput } from 'react-native-paper-dates'
import { Temporal } from '@js-temporal/polyfill'
import { Appbar, Button, TextInput } from 'react-native-paper'

export default function AddFuelStatistic() {
    const { control, handleSubmit } = useForm<FuelStatistic>({
        defaultValues: {
            date: '',
            fuelAmount: undefined,
            odometerReading: undefined,
            price: undefined,
            place: '',
        },
    })

    const getDate = (date?: string): Date =>
        date ? new Date(date) : new Date(Temporal.Now.instant().toString())

    return (
        <>
            <Appbar.Header mode='center-aligned'>
                <Appbar.Content title='Tankkaustiedot' />
            </Appbar.Header>
            <ScrollView
                contentContainerStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    rowGap: 30,
                }}
            >
                <Controller
                    name='date'
                    control={control}
                    render={({ field }) => (
                        <DatePickerInput
                            label='Päivämäärä'
                            locale='fi'
                            inputMode='start'
                            withDateFormatInLabel={false}
                            onChange={field.onChange}
                            value={getDate(field.value)}
                            startWeekOnMonday
                        />
                    )}
                />
                <Controller
                    name='fuelAmount'
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label='Tankattu määrä (l)'
                            keyboardType='numeric'
                            value={field.value?.toString() || ''}
                            onChangeText={(value) => field.onChange}
                            style={styles.input}
                        />
                    )}
                />
                <Controller
                    name='price'
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label='Kokonaishinta (€)'
                            keyboardType='numeric'
                            value={field.value?.toString() || ''}
                            onChangeText={(value) => field.onChange}
                            style={styles.input}
                        />
                    )}
                />
                <Controller
                    name='odometerReading'
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label='Mittarilukema (km)'
                            keyboardType='numeric'
                            value={field.value?.toString() || ''}
                            onChangeText={(value) => field.onChange}
                            style={styles.input}
                        />
                    )}
                />
                <Controller
                    name='place'
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label='Paikka'
                            value={field.value}
                            onChangeText={(value) => field.onChange}
                            style={styles.input}
                        />
                    )}
                />
                <Button
                    mode='contained'
                    onPress={handleSubmit((data) => {
                        console.log(data)
                    })}
                >
                    Tallenna
                </Button>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
    },
})
