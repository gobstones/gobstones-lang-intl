/**
 * This module provides mechanisms to support basic localization of strings.
 * This allows for error messages and CLI to support different languages
 * without much effort.
 *
 * Note that this module does not provide localization for the Gobstones Language
 * but for this tool internally, and should not be confused with other classes
 * exposed by this package. If you want to learn about how to translate the
 * Gobstones Language see [[models_Translator | the Translator module]] and
 * the [[models_Definition | the Definition module]].
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import flat from 'flat';
import { Locale } from './Locale';

/* Added locales should be imported and added to the translation object */
import { en } from './en';
import { es } from './es';

/**
 * The available translations that this tool can use.
 */
export const translations = { en, es };

/**
 * The default locale to use in case none is given. This can be overwritten by usage,
 * but this is provided as a simple way to avoid more complex configuration mechanisms.
 */
export const defaultLocale = 'en';

// Here onwards everything is created based on the above definition

/**
 * A type that represents a valid locale name. This a string that matches any of the
 * particular names of the localization.
 */
export type LocaleName = keyof typeof translations;

/*
 * A set of all available locale names.
 */
export const availableLocales = Object.keys(translations);

/**
 * A Translation consist of an object that hold the state of the current
 * locale being used, and allows for switching between different locales
 * and obtain translated strings.
 *
 * The translation expects a [[Locale]] to be given as the language,
 * and, if constructed with the flatten options, flattens it to allow
 * dot notation access to the different strings in the locale object.
 *
 * Note that this object does not provide mechanisms for maintaining
 * multiple languages registered, nor should be used to hold the user defined
 * language as a state object. Rather, this should be created once, setted
 * with the desired language, and used always through the full library.
 *
 */
export class Translation {
    /**
     * All the registered translations avaiable.
     */
    private availableTranslations: Record<LocaleName, Locale>;
    /**
     * The current locale being used.
     * Types to any, as may be flatten or not.
     */
    private currentLocale: any;
    /**
     * The current locale name being used.
     */
    private currentLocaleName: LocaleName;
    /**
     * Whether or not use flatten when accessing elements to translate.
     */
    private flatten: boolean;

    /**
     * Create a new instance of this translator that uses the
     *
     */
    public constructor(
        avaiableTranslations: Record<LocaleName, Locale>,
        language: LocaleName,
        flatten = false
    ) {
        this.availableTranslations = avaiableTranslations;
        this.flatten = flatten;
        this.setLanguage(language);
    }

    /**
     * Set the current language to the given locale.
     *
     * @param language A locale to use as the current language.
     */
    public setLanguage(language: LocaleName): void {
        this.currentLocaleName = language;
        this.currentLocale = this.flatten
            ? flat(this.availableTranslations[this.currentLocaleName])
            : this.availableTranslations[this.currentLocaleName];
    }

    /**
     * Translate a specific key to the currently used locale, replacing
     * any interpolation matchers by the given interpolations.
     *
     * @param key The key to use to obtain the translated text
     * @param interpolations If given, keys of this object will be used
     *      to replace any interpolation matcher in the translated text
     *      (any text in ${}) by the value of the corresponding key.
     *
     * @returns A translated string
     */
    public translate(key: string, interpolations?: Record<string, any>): string {
        let value = this.currentLocale[key];
        if (!value) return key;
        for (const each in interpolations || []) {
            value = value.replace(`\${${each}}`, `${interpolations[each]}`);
        }
        return value;
    }
}

/**
 * A default [[Translation]], set initially with the [[defaultLocale]].
 * This is convenient in libraries where localization needed is minimal
 * and is reduced to errors.
 */
export const intl = new Translation(translations, defaultLocale, true);
