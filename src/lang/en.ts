/**
 * @ignore
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { LocaleDefinition } from '../models/LocaleDefinition';

/**
 * The english translation
 */
export default {
    GBS_DEFINITION_PROGRAM: 'program',
    GBS_DEFINITION_INTERACTIVE: 'interactive',
    GBS_DEFINITION_PROCEDURE: 'procedure',
    GBS_DEFINITION_FUNCTION: 'function',
    GBS_DEFINITION_RETURN: 'return',
    GBS_DEFINITION_TYPE: 'type',
    GBS_DEFINITION_IS: 'is',
    GBS_DEFINITION_RECORD: 'record',
    GBS_DEFINITION_VARIANT: 'variant',
    GBS_DEFINITION_CASE: 'case',
    GBS_DEFINITION_FIELD: 'field',
    /* Control Structures */
    GBS_CONTROL_IF: 'if',
    GBS_CONTROL_THEN: 'then',
    GBS_CONTROL_ELSE: 'else',
    GBS_CONTROL_ELSEIF: 'elseif',
    GBS_CONTROL_CHOOSE: 'choose',
    GBS_CONTROL_WHEN: 'when',
    GBS_CONTROL_OTHERWISE: 'otherwise',
    GBS_CONTROL_SWITCH: 'switch',
    GBS_CONTROL_TO: 'to',
    GBS_CONTROL_MATCHING: 'matching',
    GBS_CONTROL_SELECT: 'select',
    GBS_CONTROL_ON: 'on',
    GBS_CONTROL_DEFAULT: 'default',
    GBS_CONTROL_REPEAT: 'repeat',
    GBS_CONTROL_WHILE: 'while',
    GBS_CONTROL_FOREACH: 'foreach',
    GBS_CONTROL_IN: 'in',
    /* Assignment */
    GBS_ASSIGN_LET: 'let',
    /* Operators */
    GBS_OPERATOR_NOT: 'not',
    // GBS_OPERATOR_AND: '',
    // GBS_OPERATOR_OR: '',
    GBS_OPERATOR_DIV: 'div',
    GBS_OPERATOR_MOD: 'mod',
    /* Types */
    GBS_TYPE_COLOR: 'Color',
    GBS_TYPE_DIR: 'Direction',
    GBS_TYPE_NUMBER: 'Number',
    GBS_TYPE_BOOL: 'Boolean',
    GBS_TYPE_STRING: 'String',
    GBS_TYPE_TUPLE: 'Tuple',
    GBS_TYPE_LIST: 'List',
    GBS_TYPE_VARIANT: 'Variant',
    GBS_TYPE_RECORD: 'Record',
    GBS_TYPE_EVENT: 'Event',
    /* Built-in values */
    GBS_COLOR_BLUE: 'Blue',
    GBS_COLOR_BLACK: 'Black',
    GBS_COLOR_RED: 'Red',
    GBS_COLOR_GREEN: 'Green',
    GBS_DIR_NORTH: 'North',
    GBS_DIR_EAST: 'East',
    GBS_DIR_SOUTH: 'South',
    GBS_DIR_WEST: 'West',
    GBS_BOOL_TRUE: 'True',
    GBS_BOOL_FALSE: 'False',
    GBS_EVENT_INIT: 'INIT',
    GBS_EVENT_TIMEOUT: 'TIMEOUT',
    /* Built-in commands */
    GBS_COMMAND_GRAB: 'Grab',
    GBS_COMMAND_DROP: 'Drop',
    GBS_COMMAND_MOVE: 'Move',
    GBS_COMMAND_MOVETOEDGE: 'GoToEdge',
    GBS_COMMAND_CLEANBOARD: 'ClearBoard',
    /** Built-in expressions */
    GBS_EXPRESSION_NUMSTONES: 'numStones',
    GBS_EXPRESSION_HASSTONES: 'hasStones',
    GBS_EXPRESSION_CANMOVE: 'canMove',
    GBS_EXPRESSION_NEXT: 'next',
    GBS_EXPRESSION_PREV: 'prev',
    GBS_EXPRESSION_OPPOSITE: 'opposite',
    GBS_EXPRESSION_ISEMPTY: 'isEmpty',
    GBS_EXPRESSION_HEAD: 'head',
    GBS_EXPRESSION_TAIL: 'tail',
    GBS_EXPRESSION_LAST: 'last',
    GBS_EXPRESSION_INIT: 'init',
    GBS_EXPRESSION_MINCOLOR: 'minColor',
    GBS_EXPRESSION_MAXCOLOR: 'maxColor',
    GBS_EXPRESSION_MINDIR: 'minDir',
    GBS_EXPRESSION_MAXDIR: 'maxDir',
    GBS_EXPRESSION_MINBOOL: 'minBool',
    GBS_EXPRESSION_MAXBOOL: 'maxBool',
    /* Error and assertion */
    GBS_ERROR_COMMAND_BOOM: 'BOOM',
    GBS_ERROR_EXPRESSION_BOOM: 'boom',
    GBS_ERROR_TYPECHECK: 'Typecheck'
} as LocaleDefinition;
