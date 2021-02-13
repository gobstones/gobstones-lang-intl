/**
 * This module contains the base structure of a Gobstones Language code translation
 * for a specific locale. The exported member [[LocaleTokens]]
 * is the type in charge of how a locale translation is defined.
 *
 * @see [[LocaleDefinition]] to see how to define a locale based on another, or a full locale.
 * @see [[LocaleTokens]] to see how to define a locale with all the keywords.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

/**
  * This type represents the spec of how the Gobstones Language code should be translated
  * as a specific locale. A locale definition can therefore consist of an object containing
  * all the required Abstract Token names to a specific Gobstones Localized names mappings,
  * or an object containing only some of those mappings but specifying the `extends` key,
  * referencing another locale by it's registered with such a name.
  *
  * If you wish to extend an existing locale, provide an object with the `extends` key
  * with the name of a built-in supported locale or user defined locale that was previously
  * registered to a [[GobstonesTranslator | translator]]. Then, add all keys that you wish to
  * override from the extended locale. The following example extends from base english and
  * overrides just the name used for the Color type in the locale (using Colour, as the british
  * spelling).
  *
  * @example
    ```
        {
            extends: 'en',
            GBS_TYPE_COLOR: 'Colour'
        }
    ```
  *
  * If that you wish is to create a new locale altogether, then you need to provide an
  * object that satisfies the [[LocaleTokens]] interface, providing a specific
  * translation for each of the required tokens.
  */
export type LocaleDefinition = LocaleTokens | ({ extends: string } & Partial<LocaleTokens>);

/**
 * This interface represents all the messages a translation should provide
 * to comply with a Gobstones Language Translation.
 *
 * If you wish to extend an already registered locale, you may want to
 * comply with [[LocaleDefinition]] instead of this interface, which allows
 * for partially defining some messages while reusing others from the extended locale.
 *
 * Each attribute on this interface corresponds to the name of an Abstract Token of the
 * Gobstones Language, and they all have type string, as an object that satisfies
 * this interface should provide each attribute with the corresponding translation as value.
 *
 * You can check the code in the repository for examples of translations.
 *
 * @see {@link https://github.com/gobstones/gobstones-lang-intl/lang/en.ts | English translation}
 * @see {@link https://github.com/gobstones/gobstones-lang-intl/lang/es.ts | Spanish translation}
 */
export interface LocaleTokens {
    /* Definitions */
    GBS_DEFINITION_PROGRAM: string;
    GBS_DEFINITION_INTERACTIVE: string;
    GBS_DEFINITION_PROCEDURE: string;
    GBS_DEFINITION_FUNCTION: string;
    GBS_DEFINITION_RETURN: string;
    GBS_DEFINITION_TYPE: string;
    GBS_DEFINITION_IS: string;
    GBS_DEFINITION_RECORD: string;
    GBS_DEFINITION_VARIANT: string;
    GBS_DEFINITION_CASE: string;
    GBS_DEFINITION_FIELD: string;
    /* Control Structures */
    GBS_CONTROL_IF: string;
    GBS_CONTROL_THEN: string;
    GBS_CONTROL_ELSE: string;
    GBS_CONTROL_ELSEIF: string;
    GBS_CONTROL_CHOOSE: string;
    GBS_CONTROL_WHEN: string;
    GBS_CONTROL_OTHERWISE: string;
    GBS_CONTROL_SWITCH: string;
    GBS_CONTROL_TO: string;
    GBS_CONTROL_MATCHING: string;
    GBS_CONTROL_SELECT: string;
    GBS_CONTROL_ON: string;
    GBS_CONTROL_DEFAULT: string;
    GBS_CONTROL_REPEAT: string;
    GBS_CONTROL_WHILE: string;
    GBS_CONTROL_FOREACH: string;
    GBS_CONTROL_IN: string;
    /* Assignment */
    GBS_ASSIGN_LET: string;
    /* Operators */
    GBS_OPERATOR_NOT: string;
    // GBS_OPERATOR_AND: string;
    // GBS_OPERATOR_OR: string;
    GBS_OPERATOR_DIV: string;
    GBS_OPERATOR_MOD: string;
    /* Types */
    GBS_TYPE_COLOR: string;
    GBS_TYPE_DIR: string;
    GBS_TYPE_NUMBER: string;
    GBS_TYPE_BOOL: string;
    GBS_TYPE_STRING: string;
    GBS_TYPE_TUPLE: string;
    GBS_TYPE_LIST: string;
    GBS_TYPE_VARIANT: string;
    GBS_TYPE_RECORD: string;
    GBS_TYPE_EVENT: string;
    /* Built-in values */
    GBS_COLOR_BLUE: string;
    GBS_COLOR_BLACK: string;
    GBS_COLOR_RED: string;
    GBS_COLOR_GREEN: string;
    GBS_DIR_NORTH: string;
    GBS_DIR_EAST: string;
    GBS_DIR_SOUTH: string;
    GBS_DIR_WEST: string;
    GBS_BOOL_TRUE: string;
    GBS_BOOL_FALSE: string;
    GBS_EVENT_INIT: string;
    GBS_EVENT_TIMEOUT: string;
    /* Built-in commands */
    GBS_COMMAND_GRAB: string;
    GBS_COMMAND_DROP: string;
    GBS_COMMAND_MOVE: string;
    GBS_COMMAND_MOVETOEDGE: string;
    GBS_COMMAND_CLEANBOARD: string;
    /** Built-in expressions */
    GBS_EXPRESSION_NUMSTONES: string;
    GBS_EXPRESSION_HASSTONES: string;
    GBS_EXPRESSION_CANMOVE: string;
    GBS_EXPRESSION_NEXT: string;
    GBS_EXPRESSION_PREV: string;
    GBS_EXPRESSION_OPPOSITE: string;
    GBS_EXPRESSION_ISEMPTY: string;
    GBS_EXPRESSION_HEAD: string;
    GBS_EXPRESSION_TAIL: string;
    GBS_EXPRESSION_LAST: string;
    GBS_EXPRESSION_INIT: string;
    GBS_EXPRESSION_MINCOLOR: string;
    GBS_EXPRESSION_MAXCOLOR: string;
    GBS_EXPRESSION_MINDIR: string;
    GBS_EXPRESSION_MAXDIR: string;
    GBS_EXPRESSION_MINBOOL: string;
    GBS_EXPRESSION_MAXBOOL: string;
    /* Error and assertion */
    GBS_ERROR_COMMAND_BOOM: string;
    GBS_ERROR_EXPRESSION_BOOM: string;
    GBS_ERROR_TYPECHECK: string;
}
