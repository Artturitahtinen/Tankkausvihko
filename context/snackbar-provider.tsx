import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Snackbar } from 'react-native-paper'

type Variant = 'success' | 'danger'

type VariantOptions = {
    [key in Variant]: {
        color: string
        icon: string
    }
}

type SnackbarContextType = {
    showSnackbar: (
        message: string,
        variant: Variant | undefined,
        duration: number
    ) => void
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        duration: 3000,
        variant: undefined as Variant | undefined,
    })

    const variantOptions: VariantOptions = {
        success: {
            color: 'green',
            icon: '✅',
        },
        danger: {
            color: 'red',
            icon: '❌',
        },
    }

    const showSnackbar = (
        message: string,
        variant: Variant | undefined,
        duration: number
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
                    backgroundColor: snackbar.variant
                        ? variantOptions[snackbar.variant].color
                        : undefined,
                }}
                visible={snackbar.visible}
                onDismiss={hideSnackbar}
                action={{
                    label: 'OK',
                    onPress: hideSnackbar,
                }}
                duration={snackbar.duration}
            >
                {`${
                    snackbar.variant
                        ? variantOptions[snackbar.variant].icon
                        : ''
                } ${snackbar.message}`}
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
