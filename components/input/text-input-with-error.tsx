import React from 'react'
import { ControllerFieldState } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { Props } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'

type FormProps = {
    value?: string
    onChange: (...event: any[]) => void
    fieldState: ControllerFieldState
}
type TextInputWithErrorProps = Props & FormProps

export const TextInputWithError = ({
    value,
    onChange,
    fieldState,
    ...rest
}: TextInputWithErrorProps) => {
    const hasErrors = (fieldState: ControllerFieldState) =>
        !!fieldState?.error?.message

    return (
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={onChange}
                value={value}
                error={hasErrors(fieldState)}
                mode='outlined'
                {...rest}
            />
            {hasErrors(fieldState) && (
                <HelperText type='error'>
                    {fieldState?.error?.message}
                </HelperText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
})
