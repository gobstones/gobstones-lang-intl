/**
 * This module contains all the Errors that a [[GobstonesTranslator]] can produce.
 * All errors extend from the base [[GobstonesTranslationError]] which in itself extends
 * Error. Check out all classes to see what the possible errors are, and be sure to check
 * [[GobstonesTranslator]] and its operations to understand when an error may be thrown.
 *
 * Each of this manages localization messages for errors messages.
 *
 * Note that all this errors end with a line in the form:
 * `Object.setPrototypeOf(this, MyErrorClass.prototype)`
 * This is due to the fact that extending Error breaks the hierarchy chain, that should be restored
 * after calling super.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

import { intl } from '../translations';

/**
 * The base error that any error that[[GobstonesTranslator]] can raise extends from.
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
 * The NonExistentLocaleGiven arises when a [[GobstonesTranslator]] is constructed
 * with a [[GobstonesTranslator.from]] or  [[GobstonesTranslator.to]] that was not
 * registered as a valid locale, or a [[GobstonesTranslator.locales]] that has a
 * locale that uses the èxtends` key referencing a language that is not defined.
 *
 * @see [[GobstonesTranslator.constructor]] for more information.
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
 * The NoFromLocaleGiven arises when a [[GobstonesTranslator.translate | translation]]
 * or a [[GobstonesTranslator.toTokens | passing to abstract tokens]] is performed on
 * a [[GobstonesTranslator | translator]] that has been created without a
 * [[GobstonesTranslatorOption.from]] option.
 *
 * @see [[GobstonesTranslator.toTokens]]
 * @see [[GobstonesTranslator.translate]]
 */
export class NoFromLocaleGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoFromLocaleGiven', intl.translate('errors.NoFromLocaleGiven'));
        Object.setPrototypeOf(this, NoFromLocaleGiven.prototype);
    }
}

/**
 * The NoToLocaleGiven arises when a [[GobstonesTranslator.translate | translation]]
 * or a [[GobstonesTranslator.fromTokens | reading from abstract tokens]] is performed on
 * a [[GobstonesTranslator | translator]] that has been created without a
 * [[GobstonesTranslatorOption.to]] option.
 *
 * @see [[GobstonesTranslator.fromTokens]]
 * @see [[GobstonesTranslator.translate]]
 */
export class NoToLocaleGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoToLocaleGiven', intl.translate('errors.NoToLocaleGiven'));
        Object.setPrototypeOf(this, NoToLocaleGiven.prototype);
    }
}

/**
 * The NoNamesGiven arises when a [[GobstonesTranslator.translate | translation]]
 * a [[GobstonesTranslator.fromTokens | reading from abstract tokens]] or a
 * a [[GobstonesTranslator.fromTokens | writing to abstract tokens]] is performed on
 * a [[GobstonesTranslator | translator]] that has been created with the
 * [[TranslationOptions.includeNames | includeNames]] option set, but created without
 * the [[GobstonesTranslatorOption.names]] option.
 *
 * @see [[GobstonesTranslator.toTokens]]
 * @see [[GobstonesTranslator.fromTokens]]
 * @see [[GobstonesTranslator.translate]]
 */
export class NoNamesGiven extends GobstonesTranslationError {
    public constructor() {
        super('NoNamesGiven', intl.translate('errors.NoNamesGiven'));
        Object.setPrototypeOf(this, NoNamesGiven.prototype);
    }
}

/**
 * The LocaleNameCollision arises when a [[GobstonesTranslator]] is created with
 * the [[GobstonesTranslatorOption.locales]] option set, and having a locale name
 * that has been previously defined as a built-in language name.
 *
 * @see [[GobstonesTranslator.constructor]]
 */
export class LocaleNameCollision extends GobstonesTranslationError {
    public constructor(localeName: string) {
        super('LocaleNameCollision', intl.translate('errors.LocaleNameCollision', { localeName }));
        Object.setPrototypeOf(this, LocaleNameCollision.prototype);
    }
}
