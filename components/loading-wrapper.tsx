import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

type LoadingWrapperProps = {
    children: ReactNode
    isLoading: boolean
}

export const LoadingWrapper = ({
    isLoading,
    children,
}: LoadingWrapperProps) => {
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return <>{children}</>
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
