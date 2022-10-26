/**
 * @module Translator
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { LocaleDefinition, availableLocales } from '../lang-translations';
import {
    LocaleNameCollision,
    NoFromLocaleGiven,
    NoNamesGiven,
    NoToLocaleGiven,
    NonExistentLocaleGiven
} from './Errors';
import { and, expect, or } from '@gobstones/gobstones-core';

import { BidirectionalMap } from '../helpers/BidirectionalMap';
import { StringReader } from '../helpers/StringReader';
import { intl } from '../translations';

/**
 * This interface represents the options that can be passed to a
 * {@link GobstonesTranslator}. This options are passed on construction time, and
 * shape the way the translator works, which locales it supports and from which
 * and to which locale it will be translating to.
 */
export interface GobstonesTranslatorOptions {
    /**
     * The locale which the {@link GobstonesTranslator} will
     * assume as source locale when given Gobstones Localized code. This
     * is the source language used in {@link GobstonesTranslator.toTokens}
     * and as the source language in {@link GobstonesTranslator.translate}.
     */
    from?: string;
    /**
     * The locale which the {@link GobstonesTranslator} will
     * assume as destination locale when given Gobstones Abstract code or
     * a Gobstones Localized code to convert to a different locale. This
     * is the destination language used in {@link GobstonesTranslator.fromTokens}
     * and as the destination language in {@link GobstonesTranslator.translate}.
     */
    to?: string;
    /**
     * A set of additional names to translate besides the built-in commands,
     * expressions and keywords of the Gobstones Language. This allows for the translation
     * of user defined procedures, functions, type names, variables and parameters.
     *
     * Note that there is no scoping on variable/parameter renaming, and the conversion
     * is limited to a word by word match.
     *
     * @example
     * ```
        names: {
            'Poner__Veces': 'Drop__Times',
            'colorAPoner':  'colorToDrop'
        }
     * ```
     */
    names?: Record<string, string>;
    /**
     * A set of additional user defined locales to register into the {@link GobstonesTranslator}.
     * By specifying a name of the locale and a set of token to string translations,
     * you are entitled to used your user defined locale as any other, both as source
     * or as destination language in a translation or token conversion.
     *
     * Even though we recommend using the standard format for naming a locale,
     * any string can be used as a name for the newly registered locales.
     *
     * Note that you must specify all token names and their corresponding translation or
     * extend a previously defined locale in order for a new registered locale to be correct.
     *
     * @example
     * ```
        languages: {
            'en-GB': {
                extends: 'en',
                GBS_TYPE_COLOR: 'Colour'
            },
            'fr': {
                GBS_GRAB: 'Prenez',
                GBS_COLOR_RED: 'Rouge'
                // extend with all other token names here
            }
        }
     * ```
     */
    locales?: Record<string, LocaleDefinition>;
    /**
     * This is a debugging option only, and should not be used
     * by users of the library.
     *
     * Set the prefix that is going to be used for each token in the output.
     * By specifying a string that contains non Gobstones Language characters
     * you ensure that there is no collision between user defined procedures
     * and the token names. By default, '$' is used as a prefix.
     *
     * @see [the "Caveats" section in the README](/#caveats) for more information.
     */
    tokenPrefix?: string;

    /**
     * This is a debugging option only, and should not be used
     * by users of the library.
     *
     * Set the suffix that is going to be used for each token in the output.
     * By specifying a string that contains non Gobstones Language characters
     * you ensure that there is no collision between user defined procedures
     * and the token names. By default, '$' is used as a suffix.
     *
     * @see [the "Caveats" section in the README](/#caveats) for more information.
     */
    tokenSuffix?: string;
}

/**
 * A set of options that can be passed to a translation function (
 * any of {@link GobstonesTranslator.toTokens}, {@link GobstonesTranslator.fromTokens} or
 * {@link GobstonesTranslator.translate}).
 */
export interface TranslationOptions {
    /**
     * Include a translation for each of the names in the {@link GobstonesTranslatorOptions.names}
     * option that the translator was created with to the output.
     */
    includeNames?: boolean;
}

/**
 * A language map, which consists of a bi-directional map that allows to access both
 * by key or by value.
 *
 * @see {@link Helpers.BidirectionalMap}
 * @private
 */
export type LanguageMap = BidirectionalMap<string, string>;

/**
 * The GobstonesTranslator class is in charge of translating all keywords and built-in
 * commands and expressions from a source locale to a destination locale, as well
 * as providing an abstract 'Tokens' intermediate output that is locale agnostic.
 *
 * You can construct an instance of this class (called a translator, for short) by
 * providing a set of {@link GobstonesTranslatorOptions} to the constructor, which are then
 * stored in the newly created instance as it's configuration.
 *
 * The configuration of a translator is private and cannot be changed once constructed.
 *
 * You can the ask the translator to perform different operations, such as translating
 * from a locale specific Gobstones Localized code to Gobstones Abstract code
 * (see {@link toTokens}), or go the other way around (see {@link fromTokens}), or event
 * translate between locales (see {@link translate}). The actions the translator is allowed
 * to perform depend on the configuration given at construction time to the translator,
 * so for example, a translator that was created without a destination language is not able
 * to translate from one language to another (See {@link constructor} and the aforementioned
 * operations for more information)
 */
export class GobstonesTranslator {
    /**
     * The locale which this translator will assume as input
     * language when given Gobstones Localized code. This
     * is the source locale used in {@link toTokens}
     * and as the source locale in {@link translate}.
     */
    private from: string | undefined;
    /**
     * The locale which this translator will
     * assume as output locale when given Gobstones Abstract code. This
     * is the destination locale used in {@link fromTokens}
     * and as the destination locale in {@link translate}.
     */
    private to: string | undefined;
    /**
     * A set of additional names for this translator used to translate
     * additional words besides the built-in commands,
     * expressions and keywords of the Gobstones Language.
     *
     * @see {@link GobstonesTranslatorOptions.names} for more info.
     */
    private names: BidirectionalMap<string, string> | undefined;
    /**
     * A set of registered locales for this translator. This is automatically
     * populated with the built-in supported locales, and expanded with the user
     * defined locales given as argument to the constructor.
     *
     * @see {@link GobstonesTranslatorOptions.locales} for more info on adding custom locales.
     */
    private registeredLocales: Record<string, LanguageMap>;
    /**
     * This is the prefix attached or expected to every abstract token when reading or
     * writing to Gobstones Abstract code. This prefix defaults to `'$'` if
     * none is given, as this symbol is not a valid token of the Gobstones Localized code, and
     * avoids unexpected collisions.
     *
     * @see [the "Caveats" section in the README](/#caveats) for more information about collisions.
     */
    private tokenPrefix: string;
    /**
     * This is the suffix attached or expected to every abstract token when reading or
     * writing to Abstract Gobstones Language code. This suffix is defaulted to `'$'`, if
     * none is given, as this symbol is not a valid token of the Gobstones Language, and
     * avoids unexpected collisions.
     *
     * @see [the "Caveats" section in the README](/#caveats) for more information about collisions.
     */
    private tokenSuffix: string;

    /**
     * Returns a new instance of {@link GobstonesTranslator} (a translator, for short) with
     * the given set of options configured.
     *
     * @param options The options to use to configure the translator.
     *
     * @see {@link GobstonesTranslatorOptions} for learning more about all the available options
     *      you can pass to the constructor.
     *
     * @throws {@link NonExistentLocaleGiven} if a name that is not a
     *      built-in supported locale, nor a user defined locale is given to any of
     *      {@link GobstonesTranslatorOptions.from} or {@link GobstonesTranslatorOptions.to}.
     *      This error also arises when a user attempts to define a locale in the
     *      {@link GobstonesTranslatorOptions.locales} option, that extends another locale, which
     *      itself is not defined.
     *
     * @throws {@link LocaleNameCollision} if a user provides a user defined
     *      locale in the {@link GobstonesTranslatorOptions.locales} option that has a name
     *      already defined (as a built-in supported locale or a user-defined locale previously
     *      defined)
     */
    public constructor(options: GobstonesTranslatorOptions) {
        this.tokenPrefix = options.tokenPrefix ?? '$';
        this.tokenSuffix = options.tokenSuffix ?? '$';

        this.registeredLocales = {};
        this.registerAllLocales(availableLocales);
        this.registerAllLocales(options.locales || {});
        this.from = options.from;
        this.to = options.to;
        this.names = options.names
            ? new BidirectionalMap(Object.entries(options.names))
            : undefined;

        or(
            expect(this.from).toBeUndefined(),
            and(
                expect(this.from).toBeDefined(),
                expect(this.registeredLocales[this.from as string]).toBeDefined()
            )
        ).orThrow(new NonExistentLocaleGiven(this.from || '', 'fromLang'));
        or(
            expect(this.to).toBeUndefined(),
            and(
                expect(this.to).toBeDefined(),
                expect(this.registeredLocales[this.to as string]).toBeDefined()
            )
        ).orThrow(new NonExistentLocaleGiven(this.to || '', 'toLang'));
    }

    /**
     * Convert a given code to a string containing abstract tokens for built-in commands
     * and expressions and language keywords.
     * The input code should be in the language this translator has configured as {@link from}.
     *
     * @param code The Gobstones Language code to translate. Assumed to be in {@link from}.
     * @param options A set of additional options for the conversion.
     *
     * @returns A string containing Abstract Gobstones Code.
     *
     * @throws {NoFromLanguageGiven} if the translator
     *      was configured without a {@link GobstonesTranslatorOptions.from | from} option.
     * @throws {NoNamesGiven} if the option
     *      {@link TranslationOptions.includeNames | includeNames} was given,
     *      but no {@link GobstonesTranslatorOptions.names | names} option was used when creating
     *      this translator.
     */
    public toTokens(code: string, options?: TranslationOptions): string {
        expect(this.from).toBeDefined().orThrow(new NoFromLocaleGiven());
        const map = this.fullMap(
            options?.includeNames || false,
            this.registeredLocales[this.from as string].getMapByValues(),
            this.names?.getMapByKeys()
        );
        return this.translateWithMap(code, map);
    }

    /**
     * Convert a given code containing abstract tokens to a Gobstones Language code
     * in the {@link to} language.
     * The input code should be a string containing Gobstones Code with abstract tokens instead
     * of language specific code (Abstract Gobstones Code).
     *
     * @param code The Gobstones Code to translate. Assumed to be Abstract Gobstones Code.
     * @param options A set of additional options for the conversion.
     *
     * @returns A string containing Gobstones Code in {@link to}.
     *
     * @throws {NoToLanguageGiven} if the translator
     *      was configured without a {@link GobstonesTranslatorOptions.to | to} option.
     * @throws {NoNamesGiven} if the option
     *      {@link TranslationOptions.includeNames | includeNames} was given,
     *      but no {@link GobstonesTranslatorOptions.names | names} option was used when creating
     *      this translator.
     */
    public fromTokens(code: string, options?: TranslationOptions): string {
        expect(this.to).toBeDefined().orThrow(new NoToLocaleGiven());
        const map = this.fullMap(
            options?.includeNames || false,
            this.registeredLocales[this.to as string].getMapByKeys(),
            this.names?.getMapByValues()
        );
        return this.translateWithMap(code, map);
    }

    /**
     * Translate a given code from the source language to the destination language.
     * The source language is the one used as {@link from} when constructing the translator, and
     * the destination language is that used as {@link to}.
     * The input should be Gobstones Language code in the source language.
     *
     * @param code The Gobstones Language code to translate. Assumed to be in {@link from}.
     * @param options A set of additional options for the conversion.
     *
     * @returns A string containing Gobstones Code in {@link to}.
     *
     * @throws {NoFromLanguageGiven} if the translator
     *      was configured without a {@link GobstonesTranslatorOptions.from | from} option.
     * @throws {NoToLanguageGiven} if the translator
     *      was configured without a {@link GobstonesTranslatorOptions.to | to} option.
     * @throws {NoNamesGiven} if the option
     *      {@link TranslationOptions.includeNames | includeNames} was given,
     *      but no {@link GobstonesTranslatorOptions.names | names} option was used when creating
     *      this translator.
     */
    public translate(code: string, options?: TranslationOptions): string {
        const optionsWithNoNames = Object.assign({}, options, { includeNames: false });
        const keywordCode = this.toTokens(code, options);
        return this.fromTokens(keywordCode, optionsWithNoNames);
    }

    /**
     * Set a locale to the internal language manager of this library so
     * that error messages are displayed translated to the specific locale.
     *
     * @param locale The locale used to display error messages.
     */
    public setLocale(locale: string): void {
        intl.setLocale(locale);
    }

    /**
     * Register the given languages in this translator instance.
     *
     * @param languages An object containing language names as keys, and language definitions
     *      as their values.
     *
     * @throws {NonExistentLocaleGiven} if a locale name that is not a
     *      built-in supported language, nor a user defined language is given to as the
     *      {@link LocaleDefinition | LocaleDefinition.extends} option in any of the language
     *      definitions.
     *
     * @throws {LocaleNameCollision} if any of the given languages
     *      has a name that has been previously defined.
     */
    private registerAllLocales(languages: Record<string, LocaleDefinition>): void {
        for (const langName in languages) {
            this.registerLocale(langName, languages[langName]);
        }
    }

    /**
     * Register a language to this instance existing languages.
     *
     * @param name The name of the language to register.
     * @param langDefinition The language definition to register.
     *
     * @throws {NonExistentLocaleGiven} if a locale name that is not a
     *      built-in supported language, nor a user defined language is given to as the
     *      {@link LocaleDefinition | LocaleDefinition.extends} option of the language definition.
     *
     * @throws {@link LocaleNameCollision} if the given name has
     *      been used in a previously registered language.
     */
    private registerLocale(name: string, langDefinition: LocaleDefinition): void {
        or(
            expect((langDefinition as any)['extends']).toBeUndefined(),
            and(
                expect((langDefinition as any)['extends']).toBeDefined(),
                expect(this.registeredLocales[(langDefinition as any)['extends']]).toBeDefined()
            )
        ).orThrow(new NonExistentLocaleGiven((langDefinition as any)['extends'], 'extends'));
        expect(this.registeredLocales[name]).toBeUndefined().orThrow(new LocaleNameCollision(name));

        const definitionEntries =
            (langDefinition as any)['extends'] !== undefined
                ? this.getExtendedDefinitionEntries(
                      langDefinition,
                      (langDefinition as any)['extends']
                  )
                : (Object.entries(langDefinition) as [string, string][]).map<[string, string]>(
                      ([k, v]) => [`${this.tokenPrefix}${k}${this.tokenSuffix}`, v]
                  );
        this.registeredLocales[name] = new BidirectionalMap(definitionEntries);
    }

    /**
     * Retrieve the set of entries constructed from the extension of the given language
     * definition with the given extended language.
     *
     * @param langDefinition The language definition that extends another.
     * @param extendedLanguage The extended language name.
     *
     * @throws {NonExistentLocaleGiven} if a locale name that is not a
     *      built-in supported language, nor a user defined language is given to as the
     *      {@link LocaleDefinition | LocaleDefinition.extends} option of the language definition.
     */
    private getExtendedDefinitionEntries(
        langDefinition: LocaleDefinition,
        extendedLanguage: string
    ): [string, string][] {
        const extendedEntries = Array.from(
            this.registeredLocales[extendedLanguage].getMapByKeys().entries()
        );
        return extendedEntries.map(([key, value]) => {
            let keyNoPrefixNorSuffix = key;
            /* istanbul ignore next */
            if (keyNoPrefixNorSuffix.startsWith(this.tokenPrefix)) {
                keyNoPrefixNorSuffix = keyNoPrefixNorSuffix.substr(this.tokenPrefix.length);
            }
            /* istanbul ignore next */
            if (keyNoPrefixNorSuffix.endsWith(this.tokenSuffix)) {
                keyNoPrefixNorSuffix = keyNoPrefixNorSuffix.substr(
                    0,
                    keyNoPrefixNorSuffix.length - this.tokenSuffix.length
                );
            }
            return (langDefinition as any)[keyNoPrefixNorSuffix]
                ? [key, (langDefinition as any)[keyNoPrefixNorSuffix]]
                : [key, value];
        });
    }

    /**
     * The map to use when performing a translation. The map to use depends on whether or
     * not the registered names are to be included.
     *
     * @param useNames Whether or not to include the registered names in the final map.
     * @param map The base map with translations from tokens to localized Gobstones Code
     *  or vice versa to use in the translation.
     *
     * @returns A new map containing all translations that are to be used.
     */
    private fullMap(
        useNames: boolean,
        map: Map<string, string>,
        namesMap?: Map<string, string>
    ): Map<string, string> {
        or(
            expect(useNames).toBeFalsy(),
            and(expect(useNames).toBeTruthy(), expect(this.names).toBeDefined())
        ).orThrow(new NoNamesGiven());
        return !useNames
            ? map
            : new Map(
                  Array.from(map.entries()).concat(Array.from(namesMap ? namesMap.entries() : []))
              );
    }

    /**
     * Translate a code string using a given set of word transformations to perform.
     * The translation can be perform between language specific localized Gobstones Language code
     * to Abstract Gobstones Code, the other way around, or between any to languages.
     * The code is generic enough to just consider the elements on the given map.
     *
     * @param code The code to translate, may be Abstract Gobstones Code or localized
     *      Gobstones Code.
     * @param map The replacement map, where each key corresponds to a word to translate,
     *      and the value the corresponding translation for such a word.
     *
     * @returns The translated code using the rules in the map.
     */
    private translateWithMap(code: string, map: Map<string, string>): string {
        let result = '';
        const sr = new StringReader(code);
        while (!sr.eof()) {
            if (sr.isWord()) {
                const word = sr.nextWord();
                if (word) {
                    result += map.has(word) ? map.get(word) : word;
                }
            } else {
                result += sr.nextChar();
            }
        }
        return result;
    }
}
