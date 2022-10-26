/**
 * @ignore
 * @module Translations
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

/* eslint-disable max-len */
import { Locale } from './Locale';

export const en: Locale = {
    errors: {
        NonExistentLocaleGiven:
            'The locale ${localeName} given to ${attribute} is not registered, nor as default nor a user defined locale. Did you forget to add an element to "languages"?',
        NoFromLanguageGiven:
            'Attempting to perform a translation or passing to keywords without a "fromLang" attribute registered.',
        NoToLanguageGiven:
            'Attempting to perform a translation or passing from keywords without a "toLang" attribute registered.',
        NoNamesGiven:
            'Attempting to use a translation with the "includeNames" option, but without registered names. Either remove the "includeNames" option or register a names object at construction time.',
        LocaleNameCollision:
            'Attempting to register a language that has been previously defined. The offending language is "${localeName}".'
    },
    cli: {
        descriptions: {
            tool: 'A Gobstones Language translation tool',
            version: 'Show the version information',
            help: 'Show the tool`s help',
            language: 'Select the language in which the tool works internally',
            in: 'Select the file from which to select the code to translate. If none given, the contents are expected inline',
            out: 'Select the output file in which to save the results. If none given, the output is written to stdout',
            from: 'The locale to translate the code from',
            to: 'The locale to translate the code to',
            names: 'A JSON string containing name transformations',
            locales: 'A set of additional locales to register to the translator'
        },
        translate: {
            description:
                'Translate Gobstones Localized code from the "from" language to the "to" language'
        },
        fromTokens: {
            description:
                'Translate Gobstones Abstract code to Gobstones Localized code in the "to" language'
        },
        toTokens: {
            description:
                'Translate Gobstones Localized code in the "from" language to Gobstones Abstract code'
        },
        errors: {
            language:
                'You specified "${lang}" as the language, but that\'s not a valid language. Select one of ${availableLangs}.',
            file: 'The file ${fileName} does not exist or cannot be read.'
        }
    }
};
