import { describe, test, expect } from '@jest/globals';
import { GobstonesTranslator } from '../src/index';

const esTranslator = new GobstonesTranslator({
    from: 'es',
    to: 'es',
});

/*
const enTranslator = new GobstonesTranslator({
    from: 'en',
    to: 'en',
});

const esToEnTranslator = new GobstonesTranslator({
    from: 'es',
    to: 'en',
});
*/

describe(`The Translator should pass to abstract tokens correctly`, () => {
    test(`Should pass spanish input language to tokens preserving format`, () => {
        const input = `program {Poner(Rojo)}`;

        const output = `$GBS_DEFINITION_PROGRAM$ {$GBS_COMMAND_DROP$($GBS_COLOR_RED$)}`;

        expect(esTranslator.toTokens(input)).toBe(output);
    });

    test(`Should pass spanish input language to tokens preserving format`, () => {
        const input = `
            program {
                Poner(Rojo)
            }
        `;

        const output = `
            $GBS_DEFINITION_PROGRAM$ {
                $GBS_COMMAND_DROP$($GBS_COLOR_RED$)
            }
        `;

        expect(esTranslator.toTokens(input)).toBe(output);
    });

});
