import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export const Heading3 = ({ children }: { children: ReactNode }) => {
    return (
        <Text variant='headlineSmall' style={styles.heading}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginBottom: 20,
    },
})
