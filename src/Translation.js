import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
    welcome: "Welcome"
}

const de = {
    welcome: "Wilkommen"
}

i18n.translations = { en, de };
i18n.locale = Localization.locale ;
i18n.fallbacks = true;

export default Translation; 