import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './english.json';
import vietnamese from './vietnamese.json';


i18next.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: english,
		vie: vietnamese
	},
	react: {
		useSuspense: false,
	},
});

export default i18next;
