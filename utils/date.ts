import { format, isValid } from "date-fns";

export const formatToUIDate = (date?: string, defaultValue = '-') => { 
    if(!date) {
        return defaultValue;
    }

    const formattedDate = format(new Date(date), 'd.M.yyyy');
    return formattedDate;
}



export const getDate = (date?: string): Date => {
    if (!date || !isValid(new Date(date))) {
        const currentDate = new Date()
        
        return currentDate
    }


    return new Date(date)
}