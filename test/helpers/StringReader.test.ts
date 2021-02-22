import { describe, expect, it } from '@jest/globals';

import { StringReader } from '../../src/helpers/StringReader';

const given = describe;

function doTimes(n: number, f: () => void): void {
    for (let i = 0; i < n; i++) {
        f();
    }
}

function consumeToNextAlpha(reader): void {
    while (!reader.isWord()) {
        reader.nextChar();
    }
}

describe('StringReader', () => {
    let reader: StringReader;
    beforeEach(() => {
        reader = new StringReader('hello world, to infinity(and beyond)');
    });

    describe('peekChar', () => {
        given('The index is not at the end', () => {
            it('Returns the next character, without moving the index', () => {
                expect(reader.peekChar()).toBe('h');
                expect(reader.peekChar()).toBe('h');
                expect(reader.peekChar()).toBe('h');
                expect(reader.peekChar()).toBe('h');
            });
        });

        given('The index is at the end', () => {
            it('Returns undefined', () => {
                doTimes(36, () => {
                    reader.nextChar();
                });
                expect(reader.peekChar()).toBeUndefined();
            });
        });
    });

    describe('nextChar', () => {
        given('The index is not at the end', () => {
            it('Returns the next character, moving the index', () => {
                expect(reader.nextChar()).toBe('h');
                expect(reader.nextChar()).toBe('e');
                expect(reader.nextChar()).toBe('l');
                expect(reader.nextChar()).toBe('l');
                expect(reader.nextChar()).toBe('o');
                expect(reader.nextChar()).toBe(' ');
            });
        });
        given('The index is at the end', () => {
            it('Returns undefined', () => {
                doTimes(36, () => {
                    reader.nextChar();
                });
                expect(reader.nextChar()).toBeUndefined();
            });
        });
    });

    describe('peekWord', () => {
        given('The index is not at the end', () => {
            it('Returns the next word, without moving the index', () => {
                expect(reader.peekWord()).toBe('hello');
                expect(reader.peekWord()).toBe('hello');
                expect(reader.peekWord()).toBe('hello');
                expect(reader.peekWord()).toBe('hello');
            });
        });
        given('The index is at the end', () => {
            it('Returns undefined', () => {
                doTimes(36, () => {
                    reader.nextChar();
                });
                expect(reader.peekWord()).toBeUndefined();
            });
        });
    });

    describe('nextWord', () => {
        given('The index is not at the end', () => {
            it('Returns the next word, moving the index', () => {
                expect(reader.nextWord()).toBe('hello');
                consumeToNextAlpha(reader);
                expect(reader.nextWord()).toBe('world');
                consumeToNextAlpha(reader);
                expect(reader.nextWord()).toBe('to');
                consumeToNextAlpha(reader);
                expect(reader.nextWord()).toBe('infinity');
                consumeToNextAlpha(reader);
                expect(reader.nextWord()).toBe('and');
                consumeToNextAlpha(reader);
                expect(reader.nextWord()).toBe('beyond');
            });
        });
        given('The index is at the end', () => {
            it('Returns undefined', () => {
                doTimes(36, () => {
                    reader.nextChar();
                });
                expect(reader.nextWord()).toBeUndefined();
            });
        });
    });

    describe('isWord', () => {
        given('The index is over a word', () => {
            it('Returns true', () => {
                expect(reader.isWord()).toBe(true);
                reader.nextChar();
                expect(reader.isWord()).toBe(true);
                reader.nextChar();
                expect(reader.isWord()).toBe(true);
                reader.nextChar();
                expect(reader.isWord()).toBe(true);
                reader.nextChar();
                expect(reader.isWord()).toBe(true);
                doTimes(22, () => {
                    reader.nextChar();
                });
                expect(reader.isWord()).toBe(true);
            });
        });
        given('The index is not over a word', () => {
            it('Returns false', () => {
                doTimes(5, () => {
                    reader.nextChar();
                });
                expect(reader.isWord()).toBe(false);
                doTimes(10, () => {
                    reader.nextChar();
                });
                expect(reader.isWord()).toBe(false);
                doTimes(9, () => {
                    reader.nextChar();
                });
                expect(reader.isWord()).toBe(false);
                doTimes(15, () => {
                    reader.nextChar();
                });
                expect(reader.isWord()).toBe(false);
            });
        });
    });
    describe('eof', () => {
        given('The index is not at end', () => {
            it('Returns false', () => {
                expect(reader.eof()).toBe(false);
                reader.nextWord();
                expect(reader.eof()).toBe(false);
                doTimes(22, () => {
                    reader.nextChar();
                });
                expect(reader.eof()).toBe(false);
            });
        });
        given('The index is at the end', () => {
            it('Returns true', () => {
                doTimes(36, () => {
                    reader.nextChar();
                });
                expect(reader.eof()).toBe(true);
            });
        });
    });
});
