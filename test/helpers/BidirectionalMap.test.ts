import { describe, expect, it } from '@jest/globals';

import { BidirectionalMap } from '../../src/helpers/BidirectionalMap';
import { given } from 'jest-rspec-utils';

describe('BidirectionalMap', () => {
    let bdmap: BidirectionalMap<string, number>;
    beforeEach(() => {
        bdmap = new BidirectionalMap<string, number>([
            ['a', 1],
            ['b', 2],
            ['c', 3],
            ['d', 4],
            ['e', 5]
        ]);
    });

    describe('hasKey', () => {
        given('An existing key', () => {
            it('Returns true', () => {
                expect(bdmap.hasKey('a')).toBe(true);
                expect(bdmap.hasKey('b')).toBe(true);
                expect(bdmap.hasKey('c')).toBe(true);
                expect(bdmap.hasKey('d')).toBe(true);
                expect(bdmap.hasKey('e')).toBe(true);
            });
        });

        given('A non existing key', () => {
            it('Returns false', () => {
                expect(bdmap.hasKey('f')).toBe(false);
                expect(bdmap.hasKey('g')).toBe(false);
                expect(bdmap.hasKey('h')).toBe(false);
            });
        });
    });

    describe('hasValue', () => {
        given('An existing value', () => {
            it('Returns true', () => {
                expect(bdmap.hasValue(1)).toBe(true);
                expect(bdmap.hasValue(2)).toBe(true);
                expect(bdmap.hasValue(3)).toBe(true);
                expect(bdmap.hasValue(4)).toBe(true);
                expect(bdmap.hasValue(5)).toBe(true);
            });
        });

        given('A non existing value', () => {
            it('Returns false', () => {
                expect(bdmap.hasValue(0)).toBe(false);
                expect(bdmap.hasValue(6)).toBe(false);
            });
        });
    });

    describe('getByKey', () => {
        given('An existing key', () => {
            it('Returns the associated value', () => {
                expect(bdmap.getByKey('a')).toBe(1);
                expect(bdmap.getByKey('b')).toBe(2);
                expect(bdmap.getByKey('c')).toBe(3);
                expect(bdmap.getByKey('d')).toBe(4);
                expect(bdmap.getByKey('e')).toBe(5);
            });
        });

        given('A non existing key', () => {
            it('Throws an error', () => {
                expect(bdmap.getByKey('f')).toBeUndefined();
                expect(bdmap.getByKey('g')).toBeUndefined();
                expect(bdmap.getByKey('h')).toBeUndefined();
            });
        });
    });

    describe('getByValue', () => {
        given('The value exists as a value', () => {
            it('Returns the associated key', () => {
                expect(bdmap.getByValue(1)).toBe('a');
                expect(bdmap.getByValue(2)).toBe('b');
                expect(bdmap.getByValue(3)).toBe('c');
                expect(bdmap.getByValue(4)).toBe('d');
                expect(bdmap.getByValue(5)).toBe('e');
            });
        });

        given('A non existing value', () => {
            it('Returns undefined', () => {
                expect(bdmap.getByValue(0)).toBeUndefined();
                expect(bdmap.getByValue(6)).toBeUndefined();
            });
        });
    });

    describe('setByKey', () => {
        it('Sets the value for the given key', () => {
            bdmap.setByKey('a', 9);
            bdmap.setByKey('f', 8);
            expect(bdmap.getByKey('a')).toBe(9);
            expect(bdmap.getByKey('f')).toBe(8);
            expect(bdmap.getByValue(9)).toBe('a');
            expect(bdmap.getByValue(8)).toBe('f');
        });
    });

    describe('setByValue', () => {
        it('Sets the key for the given value', () => {
            bdmap.setByValue(9, 'a');
            bdmap.setByValue(8, 'f');
            expect(bdmap.getByKey('a')).toBe(9);
            expect(bdmap.getByKey('f')).toBe(8);
            expect(bdmap.getByValue(9)).toBe('a');
            expect(bdmap.getByValue(8)).toBe('f');
        });
    });

    describe('getMapByKeys', () => {
        it('Get a single regular map', () => {
            const map = bdmap.getMapByKeys();
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(5);
            expect(Array.from(map.keys()).sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
            expect(Array.from(map.values()).sort()).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('getMapByValues', () => {
        it('Get a single regular map', () => {
            const map = bdmap.getMapByValues();
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(5);
            expect(Array.from(map.keys()).sort()).toEqual([1, 2, 3, 4, 5]);
            expect(Array.from(map.values()).sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
        });
    });
});
