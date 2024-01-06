import { init, getLocaleFromNavigator, dictionary, locale, _ } from 'svelte-i18n';
import en from '$lib/locales/en.json';
import bg from '$lib/locales/bg.json';

dictionary.set({ en, bg });

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
  
locale.set('en');

export { _, locale };