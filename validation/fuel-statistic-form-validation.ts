import {
    string,
    number,
    object,
    ObjectSchema,
  } from 'yup';
import { FuelStatistic } from '../utils/types';

export const fuelStatisticValidationSchema : ObjectSchema<FuelStatistic> = object({
    id: string().optional(),
    personId: string().required('Henkilö ID on pakollinen'),
    date: string().required('Päivämäärä on pakollinen'),
    fuelAmount: number()
        .typeError("Tankatun määrän tulee olla luku")
        .positive('Tankatun määrän tulee olla positiivinen luku')
        .required('Tankattu määrä on pakollinen'),
    odometerReading: number()
        .typeError("Mittarilukema tulee olla luku")
        .positive('Mittarilukema tulee olla positiivinen luku')
        .required('Mittarilukema on pakollinen'),
    price: number()
        .typeError("Hinnan tulee tulee olla luku")
        .positive('Hinnan tulee olla positiivinen luku')
        .required('Hinta on pakollinen'),
    place: string().required('Paikka on pakollinen'),
});