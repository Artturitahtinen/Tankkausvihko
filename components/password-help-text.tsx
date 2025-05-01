import React from 'react'
import { ControllerFieldState } from 'react-hook-form'
import { HelperText } from 'react-native-paper'

export const PasswordHelperText = ({
    fieldState,
}: {
    fieldState: ControllerFieldState
}) => {
    return (
        <HelperText type={fieldState.error?.message ? 'error' : 'info'}>
            Salasanan tulee olla vähintään 6 merkkiä sisältäen vähintään
            erikoismerkin sekä numeron
        </HelperText>
    )
}
