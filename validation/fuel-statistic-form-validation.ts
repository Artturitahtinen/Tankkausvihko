import {
    string,
    number,
    object,
    ObjectSchema,
  } from 'yup';
import { FuelStatistic } from '../utils/types';

export const fuelStatisticValidationSchema : ObjectSchema<FuelStatistic> = object({
    id: number().required('ID on pakollinen'),
    date: string().required('Päivämäärä on pakollinen'),
    fuelAmount: number().positive('Tankatun määrän tulee olla positiivinen')
        .required('Tankattu määrä on pakollinen'),
    odometerReading: number().positive('Mittarin luvun tulee olla positiivinen')
        .required('Mittarin luku on pakollinen'),
    price: number().positive('Hinnan tulee olla positiivinen')
        .required('Hinta on pakollinen'),
    place: string().required('Paikka on pakollinen'),
});

