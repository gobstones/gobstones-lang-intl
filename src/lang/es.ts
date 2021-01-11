/**
 * @ignore
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { LocaleDefinition } from '../models/Definition';

/**
 * The Spanish translation
 */
export default {
    extends: 'en',
    /* Types */
    GBS_TYPE_COLOR: 'Color',
    GBS_TYPE_DIR: 'Dirección',
    GBS_TYPE_NUMBER: 'Número',
    GBS_TYPE_BOOL: 'Booleano',
    GBS_TYPE_STRING: 'Texto',
    GBS_TYPE_TUPLE: 'Tupla',
    GBS_TYPE_LIST: 'Lista',
    GBS_TYPE_VARIANT: 'Variante',
    GBS_TYPE_RECORD: 'Registro',
    GBS_TYPE_EVENT: 'Evento',
    /* Built-in values */
    GBS_COLOR_BLUE: 'Azul',
    GBS_COLOR_BLACK: 'Negro',
    GBS_COLOR_RED: 'Rojo',
    GBS_COLOR_GREEN: 'Verde',
    GBS_DIR_NORTH: 'Norte',
    GBS_DIR_EAST: 'Este',
    GBS_DIR_SOUTH: 'Sur',
    GBS_DIR_WEST: 'Oeste',
    GBS_BOOL_TRUE: 'True',
    GBS_BOOL_FALSE: 'False',
    GBS_EVENT_INIT: 'INIT',
    GBS_EVENT_TIMEOUT: 'TIMEOUT',
    /* Built-in commands */
    GBS_COMMAND_GRAB: 'Sacar',
    GBS_COMMAND_DROP: 'Poner',
    GBS_COMMAND_MOVE: 'Mover',
    GBS_COMMAND_MOVETOEDGE: 'IrAlBorde',
    GBS_COMMAND_CLEANBOARD: 'VaciarTablero',
    /** Built-in expressions */
    GBS_EXPRESSION_NUMSTONES: 'nroBolitas',
    GBS_EXPRESSION_HASSTONES: 'hayBolitas',
    GBS_EXPRESSION_CANMOVE: 'puedeMover',
    GBS_EXPRESSION_NEXT: 'siguiente',
    GBS_EXPRESSION_PREV: 'previo',
    GBS_EXPRESSION_OPPOSITE: 'opuesto',
    GBS_EXPRESSION_ISEMPTY: 'esVacía',
    GBS_EXPRESSION_HEAD: 'primero',
    GBS_EXPRESSION_TAIL: 'sinElPrimero',
    GBS_EXPRESSION_LAST: 'último',
    GBS_EXPRESSION_INIT: 'sinElÚltimo'
} as LocaleDefinition;
