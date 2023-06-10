import { required, email, helpers } from '@vuelidate/validators';

const postCodeRegex = /^\d{2}-\d{3}$/;

export const firstName = helpers.withMessage('Wprowadź imię', required);

export const lastName = helpers.withMessage('Wprowadź nazwisko', required);

export const address = helpers.withMessage('Wprowadź adres', required);

export const city = helpers.withMessage('Wprowadź miasto', required);

export const emailRequired = helpers.withMessage('Wprowadź adres e-mail', required);

export const emailInvalid = helpers.withMessage('Nieprawidłowy format adresu e-mail', email);

export const postCodeRequired = helpers.withMessage('Wprowadź kod pocztowy', required);

export const postCodeInvalid = helpers.withMessage(
  'Wprowadź kod pocztowy w formacie XX-XXX',
  (value: string) => postCodeRegex.test(value) === true,
);
