import { Dialog as DeleteDialog } from '@/components/delete-dialog'
import { FuelStatisticCard } from '@/components/fuel-statistic-card'
import { LoadingWrapper } from '@/components/loading-wrapper'
import { useSessionProvider } from '@/context/session-provider'
import { useSnackbar } from '@/context/snackbar-provider'
import {
    deleteFuelStatistic,
    getFuelStatistics,
} from '@/services/fuel-statistic-service'
import { formatToUIDate } from '@/utils/date'
import { FuelStatistic } from '@/utils/types'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Home() {
    const sessionProvider = useSessionProvider()
    const { showSnackbar } = useSnackbar()
    const router = useRouter()

    const [fuelStatistics, setFuelStatistics] = useState<FuelStatistic[]>([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [selectedFuelStatistic, setSelectedFuelStatistic] = useState<
        FuelStatistic | undefined
    >(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const fetchFuelStatistics = async () => {
                setIsLoading(true)
                try {
                    const statistics = await getFuelStatistics(
                        sessionProvider?.user?.uid
                    )
                    setFuelStatistics(statistics)
                } catch (error) {
                    showSnackbar(
                        'Tankkaustietojen hakeminen epäonnistui',
                        'danger'
                    )
                } finally {
                    setIsLoading(false)
                }
            }
            fetchFuelStatistics()
        }, [sessionProvider?.user?.uid])
    )

    const handleDelete = (fuelStatistic: FuelStatistic) => {
        setSelectedFuelStatistic(fuelStatistic)
        setShowDeleteDialog(true)
    }

    const handleEdit = (fuelStatistic: FuelStatistic) => {
        router.navigate({
            pathname: '/(logged-in)/edit-fuel-statistic/[fuelStatisticId]',
            params: { fuelStatisticId: fuelStatistic.id as string },
        })
    }

    const onDelete = async (fuelStatistic: FuelStatistic) => {
        setIsDeleting(true)

        try {
            await deleteFuelStatistic(
                fuelStatistic.id as string,
                sessionProvider?.user?.uid
            )
            showSnackbar('Tankkaustiedon poistaminen onnistui', 'success')
            setShowDeleteDialog(false)
        } catch (error) {
            showSnackbar('Tankkaustiedon poistaminen epäonnistui', 'danger')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <LoadingWrapper isLoading={isLoading}>
            <ScrollView style={styles.container}>
                {fuelStatistics.map((statistic) => (
                    <FuelStatisticCard
                        key={statistic.id}
                        statistic={statistic}
                        onEdit={() => handleEdit(statistic)}
                        onDelete={() => handleDelete(statistic)}
                    />
                ))}
            </ScrollView>
            <DeleteDialog
                title={`Poista ${formatToUIDate(
                    selectedFuelStatistic?.date
                )} tankkaus`}
                content={<Text>Haluatko varmasti poistaa tankkauksen?</Text>}
                visible={showDeleteDialog}
                actionButtons={
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Button
                            mode='outlined'
                            onPress={() => setShowDeleteDialog(false)}
                        >
                            Peruuta
                        </Button>
                        <Button
                            mode='contained'
                            buttonColor='#d32f2f'
                            loading={isDeleting}
                            onPress={() =>
                                onDelete(selectedFuelStatistic as FuelStatistic)
                            }
                        >
                            Poista
                        </Button>
                    </View>
                }
                onDismiss={() => setShowDeleteDialog(false)}
            />
        </LoadingWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
})
