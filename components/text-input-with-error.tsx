import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ControllerFieldState } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { Props } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'

type TextInputWithErrorProps = Props & {
    value?: string
    onChange: (...event: any[]) => void
    fieldState: ControllerFieldState
    required?: boolean
}

export const TextInputWithError = ({
    value,
    label,
    onChange,
    fieldState,
    ...rest
}: TextInputWithErrorProps) => {
    return (
        <>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChange}
                error={!!fieldState.error?.message}
                {...rest}
            />
            <Text style={styles.error}>{fieldState.error?.message || ''}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    error: {
        marginTop: 10,
        color: 'red',
    },
})
