/**
 * This module defines an internal locale definition that any translation
 * should comply to.
 *
 * Note that this module does not provide localization for the Gobstones Language
 * but for this tool internally, and should not be confused with other classes
 * exposed by this package. If you want to learn about how to translate the
 * Gobstones Language see [[models/GobstonesTranslator | the GobstonesTranslator module]] and
 * the [[models/LocaleDefinition | the LocaleDefinition module]].
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

/**
 * Locale is an interface that states the shape a translation for this tool
 * should comply with. Elements of translation object that comply to this
 * interface can be accessed using the elements in the Translator module from
 * the @gobstones/gobstones-core package.
 */
export interface Locale {
    errors: {
        NonExistentLocaleGiven: string;
        NoFromLanguageGiven: string;
        NoToLanguageGiven: string;
        NoNamesGiven: string;
        LocaleNameCollision: string;
    };
    cli: {
        descriptions: {
            tool: string;
            version: string;
            help: string;
            language: string;
            in: string;
            out: string;
            from: string;
            to: string;
            names: string;
            locales: string;
        };
        translate: {
            description: string;
        };
        fromTokens: {
            description: string;
        };
        toTokens: {
            description: string;
        };
    };
}
