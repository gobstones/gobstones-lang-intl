/**
 * This module is in charge of the conversion and translation of
 * code between different Gobstones Localized code strings and
 * Gobstones Abstract Code. It provides classes and interfaces to
 * work with such conversions, and define how the conversions should behave.
 *
 * The following definitions are important and used through all the documentation
 * of this module:
 * * **Locale**: The short name that identifies a natural language of a user, such as
 *      'en' for English or 'es' for Spanish. Names of a locale may consist of a
 *      2 letter word that complies with ISO 639-1, or a 2 letter word followed by
 *      a dash and a 2 letter word complying with ISO-3166 (country code), such as
 *      'en-GB', 'en-US' or 'es-AR'. Additionally, you may find locales with the
 *      aforementioned shape that contains a '-full' at the end, such as 'es-full'
 *      or 'es-AR-full'. This are used to identify a version of the locale that
 *      translates both Gobstones Language built-in commands and expressions
 *      such as (Drop, Grab, or Poner, Sacar in spanish) as well as the language
 *      keywords (such as program or repeat). You can check the README to
 *      know [all the currently built-in supported locales](/#Supported Locales)
 * * **Gobstones Localized Language**: A string containing Gobstones Language code that
 *      is assumed to be in a specific locale. e.g. If a user built the code assuming
 *      english keywords and built-in commands and expressions names, the language is
 *      Gobstones Localized Language for 'en' locale.
 * * **Gobstones Abstract Language**: A string containing Gobstones Language like code, that
 *      uses Tokens instead of keywords or built-in commands or expressions names. This is
 *      locale agnostic, and cannot be run out of the box in the gobstones-interpreter, as
 *      token don't have valid Gobstones Language Syntax.
 * * **Token**: A word that is used to identify a Gobstones Language built-in commands,
 *      expressions or keyword in a locale agnostic manner. Although tokens may be
 *      configured, by default they contain symbols (a prefix and a suffix) that are
 *      not part of the standard Gobstones Syntax. An example of a token is
 *      '$GBS_COMMANDS_DROP$' That identifies the Drop built-in command. Note that the
 *      prefix and suffix are configured completely separated of the token names
 *      (GBS_COMMANDS_DROP being the token name in this case), and such prefix and suffix
 *      are only used in the input and output when consuming/producing Gobstones Abstract
 *      Language code, but not when defining locales. You can check {@link LocaleTokens}
 *      to see all the available token names.
 * * **source Locale**: The source locale is the locale that is assumed for any operation of
 *      a {@link GobstonesTranslator | translator} that required reading Gobstones Localized code.
 * * **destination Locale**: The destination locale is the locale that is assumed for any
 *      operation of a {@link GobstonesTranslator | translator} that required writing Gobstones
 *      Localized code.
 *
 * @see {@link GobstonesTranslator} to see how the translator works.
 * @see {@link GobstonesTranslatorOptions} to see how to configure a translator.
 *
 * It also contains the base structure of a Gobstones Language code translation
 * for a specific locale. The exported member {@link LocaleTokens}
 * is the type in charge of how a locale translation is defined.
 *
 * @see {@link LocaleDefinition} to see how to define a locale based on another, or a full locale.
 * @see {@link LocaleTokens} to see how to define a locale with all the keywords.
 *
 *
 * Also some errors that {@link GobstonesTranslator} can produce. All
 * errors extend from the base {@link GobstonesTranslationError} which in itself extends
 * Error. Check out all classes to see what the possible errors are, and be sure to check
 * {@link GobstonesTranslator} and its operations to understand when an error may be thrown.
 *
 * Each of this manages localization messages for errors messages.
 *
 * Note that all this errors end with a line in the form: `Object.setPrototypeOf(this,
 * MyErrorClass.prototype)` This is due to the fact that extending Error breaks the hierarchy chain,
 * that should be restored after calling super.
 *
 * @module Translator
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */
export * from './Errors';
export * from './GobstonesTranslator';
export * from './LocaleDefinition';
