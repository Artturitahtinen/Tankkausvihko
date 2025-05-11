import React, { createContext, ReactNode, useContext, useState } from 'react'
import { View } from 'react-native'
import { Icon, Snackbar, Text } from 'react-native-paper'

type Variant = 'success' | 'danger'

type VariantOptions = {
    [key in Variant]: {
        color: string
        icon: string
    }
}

type SnackbarContextType = {
    showSnackbar: (message: string, variant: Variant, duration?: number) => void
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
)

const DEFAULT_DURATION = 3000

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        duration: DEFAULT_DURATION,
        variant: 'success' as Variant,
    })

    const variantOptions: VariantOptions = {
        success: {
            color: 'green',
            icon: 'check-circle',
        },
        danger: {
            color: '#ef5350',
            icon: 'alert-circle',
        },
    }

    const showSnackbar = (
        message: string,
        variant: Variant,
        duration: number = DEFAULT_DURATION
    ) => {
        setSnackbar({
            visible: true,
            message,
            duration,
            variant,
        })
    }

    const hideSnackbar = () => {
        setSnackbar((prevState) => ({
            ...prevState,
            visible: false,
        }))
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                wrapperStyle={{ top: 0 }}
                style={{
                    backgroundColor:
                        variantOptions[snackbar.variant as keyof VariantOptions]
                            .color,
                }}
                visible={snackbar.visible}
                onDismiss={hideSnackbar}
                action={{
                    label: 'OK',
                    onPress: hideSnackbar,
                }}
                duration={snackbar.duration}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        source={variantOptions[snackbar.variant].icon}
                        size={16}
                    />
                    <Text style={{ marginLeft: 10 }}>{snackbar.message}</Text>
                </View>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext)
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    }
    return context
}
