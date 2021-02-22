import { describe, expect, it } from '@jest/globals';

import { GobstonesTranslator } from '../src/index';

const given = describe;

const esToEsTranslator = new GobstonesTranslator({
    from: 'es',
    to: 'es'
});

const enToEsTranslator = new GobstonesTranslator({
    from: 'en',
    to: 'es'
});

const esToEnTranslator = new GobstonesTranslator({
    from: 'es',
    to: 'en'
});

describe('GobstonesTranslator', () => {
    describe('setLocale', () => {
        it('Should set the locale', () => {
            esToEsTranslator.setLocale('es');
        });
    });
    describe('toTokens', () => {
        given('The input is a program in the from language', () => {
            it('Should output the same program with tokens instead of keywords', () => {
                const input = `program {Poner(Rojo)}`;
                const output = `$GBS_DEFINITION_PROGRAM$ {$GBS_COMMAND_DROP$($GBS_COLOR_RED$)}`;
                expect(esToEsTranslator.toTokens(input)).toBe(output);
            });
            it('Should output preserving format', () => {
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

                expect(esToEsTranslator.toTokens(input)).toBe(output);
            });
        });
        given('The input is a program in a different language', () => {
            it('Should only transform to tokens the keywords that match', () => {
                const input = `program {Drop(Red)}`;
                const output = `$GBS_DEFINITION_PROGRAM$ {Drop(Red)}`;
                const t1 = esToEsTranslator.toTokens(input);
                // eslint-disable-next-line no-console
                console.log(t1);
                expect(t1).toBe(output);
            });
        });
        given('Names are given to the constructor and includeNames is used', () => {
            it('Should use custom prefix and suffix for tokens', () => {
                const withNames = new GobstonesTranslator({
                    from: 'es',
                    to: 'es',
                    names: {
                        // eslint-disable-next-line camelcase
                        Poner__Veces: 'Poner_DeColor_'
                    }
                });
                const input = `program {
                    Poner__Veces(5, Rojo)
                }`;
                const output = `$GBS_DEFINITION_PROGRAM$ {
                    Poner_DeColor_(5, $GBS_COLOR_RED$)
                }`;
                expect(withNames.toTokens(input, { includeNames: true })).toBe(output);
            });
        });
    });
    describe('fromTokens', () => {
        given('The input is a program with a set of tokens', () => {
            it('Should output the same program with tokens instead of keywords', () => {
                const output = `program {Poner(Rojo)}`;
                const input = `$GBS_DEFINITION_PROGRAM$ {$GBS_COMMAND_DROP$($GBS_COLOR_RED$)}`;
                expect(esToEsTranslator.fromTokens(input)).toBe(output);
            });
            it('Should output preserving format', () => {
                const output = `
                    program {
                        Poner(Rojo)
                    }
                `;

                const input = `
                    $GBS_DEFINITION_PROGRAM$ {
                        $GBS_COMMAND_DROP$($GBS_COLOR_RED$)
                    }
                `;

                expect(esToEsTranslator.fromTokens(input)).toBe(output);
            });
        });
        given('The input is a program that has no tokens', () => {
            it('Should only transform to tokens the keywords that match', () => {
                const input = `program {Drop(Red)}`;
                const output = `program {Drop(Red)}`;
                expect(esToEsTranslator.fromTokens(input)).toBe(output);
            });
        });
        given('Names are given to the constructor and includeNames is used', () => {
            it('Should use custom prefix and suffix for tokens', () => {
                const withNames = new GobstonesTranslator({
                    from: 'es',
                    to: 'es',
                    names: {
                        // eslint-disable-next-line camelcase
                        Poner__Veces: 'Poner_DeColor_'
                    }
                });
                const output = `program {
                    Poner__Veces(5, Rojo)
                }`;
                const input = `$GBS_DEFINITION_PROGRAM$ {
                    Poner_DeColor_(5, $GBS_COLOR_RED$)
                }`;
                expect(withNames.fromTokens(input, { includeNames: true })).toBe(output);
            });
        });
    });
    describe('translate', () => {
        given('The input is a program in the from language', () => {
            it('Should translate correctly to the to language, preserving format', () => {
                const esCode = `
                    program {
                        Poner( Rojo )
                    }
                `;

                const enCode = `
                    program {
                        Drop( Red )
                    }
                `;

                expect(esToEnTranslator.translate(esCode)).toBe(enCode);
                expect(enToEsTranslator.translate(enCode)).toBe(esCode);
            });
            it('Should translate in the same way as going back and forth from tokens', () => {
                const esCode = `
                    program {
                        Poner( Rojo )
                    }
                `;

                const enCode = `
                    program {
                        Drop( Red )
                    }
                `;

                expect(esToEnTranslator.fromTokens(esToEnTranslator.toTokens(esCode))).toBe(enCode);
                expect(enToEsTranslator.fromTokens(enToEsTranslator.toTokens(enCode))).toBe(esCode);
            });
            it('Should translate to the same program if translating to original language', () => {
                const esCode = `
                    program {
                        Poner( Rojo )
                    }
                `;

                const enCode = `
                    program {
                        Drop( Red )
                    }
                `;

                expect(enToEsTranslator.translate(esToEnTranslator.translate(esCode))).toBe(esCode);
                expect(esToEnTranslator.translate(enToEsTranslator.translate(enCode))).toBe(enCode);
            });
        });
        given('Names are given to the constructor and includeNames is used', () => {
            it('Should use custom prefix and suffix for tokens', () => {
                const withNames = new GobstonesTranslator({
                    from: 'es',
                    to: 'en',
                    names: {
                        // eslint-disable-next-line camelcase
                        Poner__Veces: 'Drop__Times'
                    }
                });
                const input = `program {
                    Poner__Veces(5, Rojo)
                }`;
                const output = `program {
                    Drop__Times(5, Red)
                }`;
                expect(withNames.translate(input, { includeNames: true })).toBe(output);
            });
        });
    });
    it('Should use custom prefix and suffix for tokens', () => {
        const withCustomPrefixAndSuffix = new GobstonesTranslator({
            tokenPrefix: '%%&',
            tokenSuffix: '&$$%',
            from: 'es',
            to: 'es'
        });
        const input = `program {Poner(Rojo)}`;
        // eslint-disable-next-line max-len
        const output = `%%&GBS_DEFINITION_PROGRAM&$$% {%%&GBS_COMMAND_DROP&$$%(%%&GBS_COLOR_RED&$$%)}`;
        expect(withCustomPrefixAndSuffix.toTokens(input)).toBe(output);
    });
});
