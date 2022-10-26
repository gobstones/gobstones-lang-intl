/**
 * @module LangTranslations
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { LocaleDefinition } from '../translator/LocaleDefinition';

/**
 * An English translation for british english.
 *
 * The only change present is refered to "Color", spelled "Colour" in
 * british english.
 */
export const enUK = {
    extends: 'en',
    /* Types */
    GBS_TYPE_COLOR: 'Colour',
    /** Built-in expressions */
    GBS_EXPRESSION_MINCOLOR: 'minColor',
    GBS_EXPRESSION_MAXCOLOR: 'maxColor'
} as LocaleDefinition;

export default enUK;
