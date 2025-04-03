import { Redirect } from 'expo-router'
import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('fi', {
    save: 'Tallenna',
    selectSingle: 'Valitse päivämäärä',
    selectMultiple: 'Valitse päivämäärät',
    selectRange: 'Valitse aikaväli',
    notAccordingToDateFormat: (inputFormat) =>
        `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Päivän pitää olla myöhemmin kuin ${date}`,
    mustBeLowerThan: (date) => `Päivän pitää olla aikaisemmin kuin ${date}`,
    mustBeBetween: (startDate, endDate) =>
        `Täytyy olla ${startDate} - ${endDate} välissä`,
    dateIsDisabled: 'Päivä ei ole sallitu',
    previous: 'Edellinen',
    next: 'Seuraava',
    typeInDate: 'Valitse päivä',
    pickDateFromCalendar: 'Valitse kalenterista',
    close: 'Sulje',
    hour: '24',
    minute: '60',
})

const StartPage = () => {
    return <Redirect href='/fuel-statistics' />
}

export default StartPage
