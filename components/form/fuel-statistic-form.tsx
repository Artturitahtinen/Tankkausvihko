import { getDate } from '@/utils/date'
import { FuelStatistic } from '@/utils/types'
import React, { ReactNode } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { TextInputWithError } from '../input/text-input-with-error'

type FuelStatisticFormProps = {
    form: UseFormReturn<FuelStatistic, any, FuelStatistic>
    title?: string
    actionsButtons: ReactNode
    onSubmit: SubmitHandler<FuelStatistic>
}

export const FuelStatisticForm = ({
    form,
    title,
    actionsButtons,
}: FuelStatisticFormProps) => {
    return (
        <>
            {title && (
                <Appbar.Header>
                    <Appbar.Content title={title} />
                </Appbar.Header>
            )}
            <ScrollView
                contentContainerStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    paddingBottom: 50,
                    rowGap: 10,
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
                                mode='outlined'
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={getDate(field?.value)}
                                startYear={2000}
                                endYear={new Date().getFullYear()}
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
                    name='kilometres'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <View style={styles.input}>
                            <TextInputWithError
                                label='Kilometrimäärä tankkauksella (km)'
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

                <View style={styles.actionButtons}>{actionsButtons}</View>
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
