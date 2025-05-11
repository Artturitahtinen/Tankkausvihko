import { FuelStatisticForm } from '@/components/form/fuel-statistic-form'
import { useSessionProvider } from '@/context/session-provider'
import { useSnackbar } from '@/context/snackbar-provider'
import { addFuelStatistic } from '@/services/fuel-statistic-service'
import { FuelStatistic } from '@/utils/types'
import { fuelStatisticValidationSchema } from '@/validation/validation-schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'

export default function AddFuelStatistic() {
    const sessionProvider = useSessionProvider()
    const { showSnackbar } = useSnackbar()

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

    const [isSaving, setIsSaving] = useState(false)

    const onSubmit: SubmitHandler<FuelStatistic> = async (data) => {
        setIsSaving(true)

        try {
            await addFuelStatistic(data, sessionProvider.user?.uid)
            showSnackbar('Tankkaustiedon lisääminen onnistui', 'success')
        } catch (error) {
            showSnackbar('Tankkaustiedon lisääminen epäonnistui', 'danger')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <FuelStatisticForm
            form={form}
            actionsButtons={
                <>
                    <Button mode='outlined' onPress={() => form.reset()}>
                        Tyhjennä kentät
                    </Button>
                    <Button
                        mode='contained'
                        loading={isSaving}
                        disabled={isSaving}
                        onPress={form.handleSubmit(onSubmit)}
                    >
                        Tallenna
                    </Button>
                </>
            }
            onSubmit={onSubmit}
        />
    )
}
