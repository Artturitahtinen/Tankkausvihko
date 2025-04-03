import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FuelStatistic } from '../utils/types'
import { DatePickerInput } from 'react-native-paper-dates'
import { Temporal } from '@js-temporal/polyfill'

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
        <View style={styles.container}>
            <form style={{ width: '80%' }}>
                <Controller
                    name='date'
                    control={control}
                    render={({ field }) => (
                        <DatePickerInput
                            startWeekOnMonday
                            locale='fi'
                            inputMode='start'
                            withDateFormatInLabel={false}
                            onChange={field.onChange}
                            value={getDate(field.value)}
                        />
                    )}
                />
            </form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
})
