import { FuelStatisticForm } from '@/components/form/fuel-statistic-form'
import { LoadingWrapper } from '@/components/loading-wrapper'
import { useSessionProvider } from '@/context/session-provider'
import { useSnackbar } from '@/context/snackbar-provider'
import {
    editFuelStatistic,
    getFuelStatisticByIdAndPersonUid,
} from '@/services/fuel-statistic-service'
import { formatToUIDate } from '@/utils/date'
import { FuelStatistic } from '@/utils/types'
import { fuelStatisticValidationSchema } from '@/validation/validation-schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'

export default function ModifyFuelStatistic() {
    const sessionProvider = useSessionProvider()
    const { showSnackbar } = useSnackbar()

    const { fuelStatisticId } = useLocalSearchParams() as {
        fuelStatisticId: string
    }
    const [fuelStatistic, setFuelStatistic] = useState<FuelStatistic | null>(
        null
    )
    const [isSaving, setIsSaving] = useState(false)
    const [isLoadingInitialValues, setIsLoadingInitialValues] = useState(true)

    const form = useForm<FuelStatistic>({
        defaultValues: {
            date: new Date().toString(),
            fuelAmount: undefined,
            kilometres: undefined,
            price: undefined,
            place: '',
        },
        resolver: yupResolver(fuelStatisticValidationSchema),
    })

    useEffect(() => {
        const fetchFuelStatistic = async () => {
            try {
                const fetchedFuelStatistic =
                    await getFuelStatisticByIdAndPersonUid(
                        fuelStatisticId,
                        sessionProvider.user?.uid
                    )

                setFuelStatistic(fetchedFuelStatistic)
                form.reset({
                    date: fetchedFuelStatistic?.date ?? '',
                    fuelAmount: fetchedFuelStatistic?.fuelAmount ?? 0,
                    kilometres: fetchedFuelStatistic?.kilometres ?? 0,
                    price: fetchedFuelStatistic?.price ?? 0,
                    place: fetchedFuelStatistic?.place ?? '',
                })
                setIsLoadingInitialValues(false)
            } catch (error) {
                showSnackbar('Tankkaustiedon hakeminen epäonnistui', 'danger')
            }
        }

        fetchFuelStatistic()
    }, [])

    const onSubmit: SubmitHandler<FuelStatistic> = async (data) => {
        setIsSaving(true)

        try {
            await editFuelStatistic(
                { id: fuelStatisticId, ...data },
                sessionProvider.user?.uid
            )
            showSnackbar('Tankkaustiedon muokkaaminen onnistui', 'success')
        } catch (error) {
            showSnackbar('Tankkaustiedon muokkaaminen epäonnistui', 'danger')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <LoadingWrapper isLoading={isLoadingInitialValues}>
            <FuelStatisticForm
                form={form}
                title={`${formatToUIDate(fuelStatistic?.date) ?? ''} tankkaus`}
                actionsButtons={
                    <>
                        <Button
                            mode='contained'
                            onPress={form.handleSubmit(onSubmit)}
                            loading={isSaving}
                            disabled={isSaving}
                        >
                            Tallenna
                        </Button>
                    </>
                }
                onSubmit={onSubmit}
            />
        </LoadingWrapper>
    )
}
