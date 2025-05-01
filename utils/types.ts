export type FuelStatistic = {
    id?: string
    personId: string
    place?: string
    date?: string
    fuelAmount: number
    odometerReading: number
    price: number
}
export type RegisterForm = AuthenticationForm

export type LoginForm = AuthenticationForm

type AuthenticationForm = {
    email: string
    password: string
}