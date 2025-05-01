import { PasswordInput } from '@/components/input/password-input'
import { TextInputWithError } from '@/components/input/text-input-with-error'
import { PasswordHelperText } from '@/components/password-help-text'
import { useSnackbar } from '@/context/snackbar-provider'
import { auth } from '@/firebaseConfig'
import { authErrorMap } from '@/utils/constants'
import { RegisterForm } from '@/utils/types'
import { registerValidationSchema } from '@/validation/validation-schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, PaperProvider, Portal, Text } from 'react-native-paper'

export default function Register() {
    const form = useForm<RegisterForm>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(registerValidationSchema),
    })
    const snackbar = useSnackbar()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [authErrorCode, setAuthErrorCode] = useState('')

    const onSubmit: SubmitHandler<RegisterForm> = async ({
        email,
        password,
    }) => {
        setIsLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await sendEmailVerification(user)

            snackbar.showSnackbar(
                'Käyttäjä rekisteröity onnistuneesti. Voit kirjautua vahvistettuasi sähköpostiosoitteen.',
                'success',
                10000
            )
            router.navigate('/')
        } catch (error) {
            if (error instanceof FirebaseError) {
                setAuthErrorCode(error.code)
                return
            }
            setAuthErrorCode('unknown')
        } finally {
            setIsLoading(false)
        }
    }

    const resetAuthErrorCode = () => {
        setAuthErrorCode('')
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text variant='headlineSmall'>Rekisteröidy</Text>
                <View style={styles.inputs}>
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <TextInputWithError
                                label='Sähköposti'
                                value={field.value}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                fieldState={fieldState}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name='password'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <>
                                <PasswordInput
                                    field={field}
                                    fieldState={fieldState}
                                />
                                <PasswordHelperText fieldState={fieldState} />
                            </>
                        )}
                    />
                    <Button
                        mode='contained'
                        onPress={form.handleSubmit(onSubmit)}
                        loading={isLoading}
                    >
                        Valmis
                    </Button>
                </View>
            </View>
            <Portal>
                <Dialog
                    visible={!!authErrorCode}
                    onDismiss={resetAuthErrorCode}
                >
                    <Dialog.Title>
                        Käyttäjän rekisteröinti ei onnistunut
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            {authErrorMap[authErrorCode] ??
                                authErrorMap['unknown']}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={resetAuthErrorCode}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        width: '100%',
    },
})
