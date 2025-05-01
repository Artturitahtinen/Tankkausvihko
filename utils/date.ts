import { Temporal } from "@js-temporal/polyfill";
import { isValid } from "date-fns";

export const formatToUIDate = (date?: string, defaultValue = '-') => { 
    if(!date) {
        return defaultValue;
    }

    return Temporal.PlainDate.from(date).toLocaleString('fi-FI')
}

export const getDate = (date?: string): Date => {
    if (!date || !isValid(date)) {
        console.log('Invalid date, returning current date')

        return new Date(Temporal.Now.instant().toString())
    }

    return new Date(date)
}