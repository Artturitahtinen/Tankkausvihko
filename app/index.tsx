import { Divider } from '@/components/divider'
import { Heading3 } from '@/components/heading/heading3'
import { PasswordInput } from '@/components/input/password-input'
import { TextInputWithError } from '@/components/input/text-input-with-error'
import { auth } from '@/firebaseConfig'
import { LoginForm } from '@/utils/types'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { registerTranslation } from 'react-native-paper-dates'

registerTranslation('fi', {
    save: 'Tallenna',
    selectSingle: 'Valitse päivämäärä',
    selectMultiple: 'Valitse päivämäärät',
    selectRange: 'Valitse aikaväli',
    notAccordingToDateFormat: (inputFormat) =>
        `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Päivän pitää olla myöhemmin kuin ${date}`,
    mustBeLowerThan: (date) => `Päivän pitää olla aikaisemmin kuin ${date}`,
    mustBeBetween: (startDate, endDate) =>
        `Täytyy olla ${startDate} - ${endDate} välissä`,
    dateIsDisabled: 'Päivä ei ole sallitu',
    previous: 'Edellinen',
    next: 'Seuraava',
    typeInDate: 'Valitse päivä',
    pickDateFromCalendar: 'Valitse kalenterista',
    close: 'Sulje',
    hour: '24',
    minute: '60',
})

export default function Login() {
    const form = useForm<LoginForm>({
        defaultValues: { email: '', password: '' },
    })

    const formValues = form.watch()
    const router = useRouter()

    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const navigateToHomeIfLoggedIn = () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/(logged-in)/(tabs)/home')
            } else {
                setIsCheckingAuth(false)
            }
        })

        return unsubscribe
    }

    useEffect(navigateToHomeIfLoggedIn, [router])

    const login = async () => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(
                auth,
                formValues.email,
                formValues.password
            )
            router.replace('/(logged-in)/(tabs)/home')
        } catch (error) {
            setLoginError('Tarkista sähköposti ja salasana')
        } finally {
            setIsLoading(false)
        }
    }

    if (isCheckingAuth) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Heading3>Kirjaudu sähköpostilla</Heading3>
            </View>
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
                    <PasswordInput field={field} fieldState={fieldState} />
                )}
            />
            <View style={styles.passwordHelpContainer}>
                <Text
                    style={{
                        color: 'red',
                    }}
                >
                    {loginError}
                </Text>
                <Text style={styles.forgotPassword}>Unohtuiko salasana?</Text>
            </View>
            <View style={styles.actions}>
                <Button
                    mode='contained'
                    onPress={login}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Kirjaudu sisään
                </Button>
                <Divider>Tai</Divider>
                <Button
                    mode='outlined'
                    onPress={() => router.navigate('./register')}
                >
                    Rekisteröidy
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 20,
    },
    inputs: {
        width: '10%',
    },
    forgotPassword: {
        textAlign: 'right',
        marginTop: 5,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    actions: {
        marginTop: 30,
    },
    heading: {
        alignSelf: 'center',
    },
    passwordHelpContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
