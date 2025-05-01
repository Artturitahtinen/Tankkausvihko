export const authErrorMap : Record<string, string> = {
    'auth/password-does-not-meet-requirements': 'Salasanan tulee olla vähintään 6 merkkiä ja sisältää vähintään 1 erikoismerkin sekä 1 numeron.',
    'auth/invalid-email': 'Sähköposti ei ole oikeassa muodossa.',
    'auth/email-already-in-use': 'Sähköposti on jo käytössä. Kirjaudu sisään tai käytä toista sähköpostia.',
    'unknown': 'Odottamaton virhe rekisteröimisessä. Ota yhteyttä ylläpitäjään, jos ongelma toistuu.'
}