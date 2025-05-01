import { RegisterForm } from '@/utils/types'
import React, { useState } from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { TextInput } from 'react-native-paper'

type PasswordInputProps = {
    field: ControllerRenderProps<RegisterForm, 'password'>
    fieldState: ControllerFieldState
}

export const PasswordInput = ({ field, fieldState }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState({
        isSecureTextEntry: true,
        icon: 'eye',
    })

    const toggleShowPassword = () => {
        setShowPassword((prev) => {
            return {
                isSecureTextEntry: !prev.isSecureTextEntry,
                icon: !prev.isSecureTextEntry ? 'eye' : 'eye-off',
            }
        })
    }

    return (
        <TextInput
            label='Salasana'
            value={field.value}
            secureTextEntry={showPassword.isSecureTextEntry}
            keyboardType={
                showPassword.isSecureTextEntry ? 'default' : 'visible-password'
            }
            autoCapitalize='none'
            right={
                <TextInput.Icon
                    onPress={toggleShowPassword}
                    icon={showPassword.icon}
                />
            }
            mode='outlined'
            error={!!fieldState.error?.message}
            onChangeText={field.onChange}
        />
    )
}
