import { Locale } from './locale';
import enUS from './en-US.json';

export type LocaleKey = keyof typeof enUS;
export enum AvailableLocales {
	'en-US' = 'en-US',
	'te-ST' = 'te-ST',
}

let l: Locale;

export const initLocale = (locale?: AvailableLocales) => {
	if (!l) l = new Locale(locale);
};

export const t = (key: LocaleKey) => {
	return l.getTranslation(key);
};
