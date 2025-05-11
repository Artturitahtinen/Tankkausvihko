import { ReactNode } from "react"

export type FuelStatistic = {
    id?: string
    place?: string
    date?: string
    fuelAmount: number
    kilometres: number
    price: number
}
export type RegisterForm = AuthenticationForm

export type AuthenticationForm = {
    email: string
    password: string
}

export type DeleteDialogProps = {
    visible: boolean
    title: ReactNode
    content: ReactNode
    actionButtons: ReactNode
    onDismiss: () => void
}
