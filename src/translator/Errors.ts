/**
 * @module Translator
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { intl } from '../translations';

/**
 * The base error that any error that {@link GobstonesTranslator} can raise extends from.
 * This base class just sets a specific name and the ìsError` property as true.
 */
export class GobstonesTranslationError extends Error {
    public isError: boolean;

    public constructor(name: string, message: string) {
        super(message);
        this.name = name;
        this.isError = true;
        Object.setPrototypeOf(this, GobstonesTranslationError.prototype);
    }
}

/**
 * The NonExistentLocaleGiven arises when a {@link GobstonesTranslator} is constructed with a
 * {@link GobstonesTranslator.from} or {@link GobstonesTranslator.to} that was not
 * registered as a valid locale, or  alocales that has a locale
 * that uses the `extends` key referencing a language that is not defined.
 *
 * @see {@link GobstonesTranslator.constructor} for more information.
 */
export class NonExistentLocaleGiven extends GobstonesTranslationError {
    public constructor(langName: string, attribute: string) {
        super(
            'NonExistentLocaleGiven',
            intl.translate('errors.NonExistentLocaleGiven', {
                langName,
                attribute
            })
        );
        Object.setPrototypeOf(this, NonExistentLocaleGiven.prototype);
    }
}

/**
 * The NoFromLocaleGiven arises when a {@link GobstonesTranslator.translate | translation} or
 * a {@link GobstonesTranslator.toTokens | passing to abstract tokens} is performed on a
 * {@link GobstonesTranslator | translator} that has been created without a
 * {@link GobstonesTranslatorOptions.from} option.
 *
 * @see {@link GobstonesTranslator.toTokens}
 * @see {@link GobstonesTranslator.translate}
 */
export class NoFromLocaleGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoFromLocaleGiven', intl.translate('errors.NoFromLocaleGiven'));
        Object.setPrototypeOf(this, NoFromLocaleGiven.prototype);
    }
}

/**
 * The NoToLocaleGiven arises when a {@link GobstonesTranslator.translate | translation} or a
 * {@link GobstonesTranslator.fromTokens | reading from abstract tokens} is performed on a
 * {@link GobstonesTranslator | translator} that has been created without a
 * {@link GobstonesTranslatorOptions.to} option.
 *
 * @see {@link GobstonesTranslator.fromTokens}
 * @see {@link GobstonesTranslator.translate}
 */
export class NoToLocaleGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoToLocaleGiven', intl.translate('errors.NoToLocaleGiven'));
        Object.setPrototypeOf(this, NoToLocaleGiven.prototype);
    }
}

/**
 * The NoNamesGiven arises when a {@link GobstonesTranslator.translate | translation} a
 * {@link GobstonesTranslator.fromTokens | reading from abstract tokens} or a a
 * {@link GobstonesTranslator.fromTokens | writing to abstract tokens} is performed on a
 * {@link GobstonesTranslator | translator} that has been created with the
 * {@link TranslationOptions.includeNames | includeNames} option set, but created without the
 * {@link GobstonesTranslatorOptions.names} option.
 *
 * @see {@link GobstonesTranslator.toTokens}
 * @see {@link GobstonesTranslator.fromTokens}
 * @see {@link GobstonesTranslator.translate}
 */
export class NoNamesGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoNamesGiven', intl.translate('errors.NoNamesGiven'));
        Object.setPrototypeOf(this, NoNamesGiven.prototype);
    }
}

/**
 * The LocaleNameCollision arises when a {@link GobstonesTranslator} is created with the
 * {@link GobstonesTranslatorOptions.locales} option set, and having a locale name that has
 * been previously defined as a built-in language name.
 *
 * @see {@link GobstonesTranslator.constructor}
 */
export class LocaleNameCollision extends GobstonesTranslationError {
    public constructor(localeName: string) {
        super('LocaleNameCollision', intl.translate('errors.LocaleNameCollision', { localeName }));
        Object.setPrototypeOf(this, LocaleNameCollision.prototype);
    }
}
