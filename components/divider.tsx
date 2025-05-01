import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type DividerProps = {
    children?: ReactNode
}

export const Divider = ({ children }: DividerProps) => {
    if (!children)
        return (
            <View style={styles.container}>
                <View style={styles.line} />
            </View>
        )

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.textContainer}>
                <Text>{children}</Text>
            </View>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    textContainer: {
        paddingHorizontal: 10,
    },
})
