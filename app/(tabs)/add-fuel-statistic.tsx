import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'
import {
    useForm,
    Controller,
    SubmitErrorHandler,
    SubmitHandler,
} from 'react-hook-form'
import { DatePickerInput } from 'react-native-paper-dates'
import { Temporal } from '@js-temporal/polyfill'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { FuelStatistic } from '@/utils/types'
import { fuelStatisticValidationSchema } from '@/validation/fuel-statistic-form-validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInputWithError } from '@/components/text-input-with-error'
import { getDate } from '@/utils/date'

export default function AddFuelStatistic() {
    const form = useForm<FuelStatistic>({
        defaultValues: {
            date: new Date().toString(),
            fuelAmount: undefined,
            odometerReading: undefined,
            price: undefined,
            place: '',
        },
        resolver: yupResolver(fuelStatisticValidationSchema),
    })

    const { handleSubmit } = form

    const onSubmit: SubmitHandler<FuelStatistic> = (data) =>
        console.log({ data })

    const onError: SubmitErrorHandler<FuelStatistic> = (errors, e) => {
        console.log(form.control._formValues)
        return console.log(errors)
    }

    return (
        <>
            <Appbar.Header mode='center-aligned'>
                <Appbar.Content title='Tankkaustiedot' />
            </Appbar.Header>
            <ScrollView
                contentContainerStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    paddingBottom: 50,
                    rowGap: 30,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <Controller
                    name='date'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <DatePickerInput
                                error={!!fieldState.error?.message}
                                label='Päivämäärä'
                                locale='fi'
                                inputMode='start'
                                withDateFormatInLabel={false}
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={getDate(field.value)}
                                startYear={2000}
                                endYear={Temporal.Now.plainDateISO().year}
                                startWeekOnMonday
                            />
                            <Text style={styles.error}>
                                {fieldState.error?.message || ''}
                            </Text>
                        </View>
                    )}
                />
                <Controller
                    name='fuelAmount'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <TextInputWithError
                                label='Tankattu määrä (l)'
                                keyboardType='numeric'
                                value={field.value?.toString() || ''}
                                onChange={field.onChange}
                                fieldState={fieldState}
                            />
                        </View>
                    )}
                />
                <Controller
                    name='price'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <TextInputWithError
                                label='Kokonaishinta (€)'
                                keyboardType='numeric'
                                value={field.value?.toString() || ''}
                                onChange={field.onChange}
                                fieldState={fieldState}
                            />
                        </View>
                    )}
                />
                <Controller
                    name='odometerReading'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <TextInputWithError
                                label='Mittarilukema (km)'
                                keyboardType='numeric'
                                value={field.value?.toString() || ''}
                                onChange={field.onChange}
                                fieldState={fieldState}
                            />
                        </View>
                    )}
                />

                <Controller
                    name='place'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <TextInputWithError
                                label='Paikka'
                                value={field.value}
                                onChange={field.onChange}
                                fieldState={fieldState}
                            />
                        </View>
                    )}
                />
                <View style={styles.actionButtons}>
                    <Button
                        mode='contained'
                        onPress={handleSubmit(onSubmit, onError)}
                    >
                        Tallenna
                    </Button>
                    <Button mode='contained' onPress={() => form.reset()}>
                        Tyhjennä kentät
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
    },
    error: {
        marginTop: 10,
        color: 'red',
    },
    actionButtons: {
        flexDirection: 'row',
        columnGap: 20,
    },
})
