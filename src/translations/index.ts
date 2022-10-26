/**
 * @ignore
 *
 * This module defines an internal locale definition that any translation
 * should comply to.
 *
 * Note that this module does not provide localization for the Gobstones Language
 * but for this tool internally, and should not be confused with other classes
 * exposed by this package. If you want to learn about how to translate the
 * Gobstones Language see {@link Translator | the Translator module}.
 *
 * @module Translations
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */
import { Locale } from './Locale';
import { Translator } from '@gobstones/gobstones-core';
/* Added locales should be imported and added to the Translator object */
import { en } from './en';
import { es } from './es';

export const availableLocales = {
    en,
    'en-AU': en,
    'en-BZ': en,
    'en-CA': en,
    'en-CB': en,
    'en-GB': en,
    'en-IE': en,
    'en-IN': en,
    'en-JM': en,
    'en-MT': en,
    'en-MY': en,
    'en-NZ': en,
    'en-PH': en,
    'en-SG': en,
    'en-TT': en,
    'en-US': en,
    'en-ZA': en,
    'en-ZW': en,
    es,
    'es-AR': es,
    'es-BO': es,
    'es-CL': es,
    'es-CO': es,
    'es-CR': es,
    'es-DO': es,
    'es-EC': es,
    'es-ES': es,
    'es-GT': es,
    'es-HN': es,
    'es-MX': es,
    'es-NI': es,
    'es-PA': es,
    'es-PE': es,
    'es-PR': es,
    'es-PY': es,
    'es-SV': es,
    'es-US': es,
    'es-UY': es,
    'es-VE': es
};

export const intl = new Translator<Locale>(availableLocales, 'en');
