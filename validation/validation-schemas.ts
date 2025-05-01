import {
    number,
    object,
    ObjectSchema,
    string,
} from 'yup';
import { FuelStatistic, RegisterForm } from '../utils/types';

export const fuelStatisticValidationSchema : ObjectSchema<FuelStatistic> = object({
    id: string().optional(),
    personId: string().required('Henkilö ID on pakollinen'),
    date: string().required('Päivämäärä on pakollinen'),
    fuelAmount: number()
        .typeError('Tankatun määrän tulee olla luku')
        .positive('Tankatun määrän tulee olla positiivinen luku')
        .required('Tankattu määrä on pakollinen'),
    odometerReading: number()
        .typeError('Mittarilukema tulee olla luku')
        .positive('Mittarilukema tulee olla positiivinen luku')
        .required('Mittarilukema on pakollinen'),
    price: number()
        .typeError('Hinnan tulee tulee olla luku')
        .positive('Hinnan tulee olla positiivinen luku')
        .required('Hinta on pakollinen'),
    place: string().required('Paikka on pakollinen'),
});

export const registerValidationSchema: ObjectSchema<RegisterForm> = object({
    email: string()
        .required('Sähköposti on pakollinen')
        .email('Sähköposti on virheellinen'),  
    password: string()
        .required('Salasana on pakollinen')
        .min(5, 'Salasanan tulee olla vähintään 6 merkkiä pitkä')
        .matches(/\d/, 'Salasanan tulee sisältää vähintään yksi numero')
        .matches(/[!@#$%^&*(),.?=":{}|<>]/, 'Salasanan tulee sisältää vähintään yksi erikoismerkki'),
});