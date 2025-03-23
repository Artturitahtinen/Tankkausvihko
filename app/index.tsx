import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Table, Row, Rows } from 'react-native-reanimated-table'

export default function Index() {
    const state = {
        tableHead: [
            'Pvm',
            'Paikka',
            'Ajetut kilometrit',
            'Polttoaineen hinta / l',
            'Laskettu kulutus',
        ],
        tableData: [
            ['1', '2', '3', '4', ''],
            ['a', 'b', 'c', 'd', ''],
            ['1', '2', '3', '456\n789', ''],
            ['a', 'b', 'c', 'd', ''],
        ],
    }

    return (
        <SafeAreaView>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row
                    data={state.tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                />
                <Rows data={state.tableData} textStyle={styles.text} />
            </Table>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
})
