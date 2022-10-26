/**
 * This module provides definitions for different languages in which
 * Gobstones can be used (as a programming language that is).
 *
 * @module LangTranslations
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { en } from './en';
import { enUK } from './en-UK';
import { es } from './es';

export { LocaleDefinition } from '../translator/LocaleDefinition';

/**
 * The available locales for this package. New locales can be provided
 * by the user at runtime, but the ones presented here are included by default.
 */
export const availableLocales = {
    en,
    'en-AU': enUK,
    'en-BZ': en,
    'en-CA': enUK,
    'en-CB': enUK,
    'en-GB': enUK,
    'en-IE': enUK,
    'en-IN': enUK,
    'en-JM': enUK,
    'en-MT': enUK,
    'en-MY': enUK,
    'en-NZ': enUK,
    'en-PH': enUK,
    'en-SG': enUK,
    'en-TT': enUK,
    'en-US': en,
    'en-ZA': enUK,
    'en-ZW': enUK,
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

export default availableLocales;
