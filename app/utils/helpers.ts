import { Temporal } from "@js-temporal/polyfill";

export const formatToUIDate = (date?: string) => { 
    if(!date) {
        return '-';
    }

    return Temporal?.PlainDate?.from(date).toLocaleString('fi-FI')}

    export default formatToUIDate;