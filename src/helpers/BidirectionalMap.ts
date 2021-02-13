/**
 * This module exports a convenient class for a bidirectional map.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

/**
 * A bidirectional map consists of a two way map, that can be accessed
 * both by the keys, or by the values. Note that in order to correctly
 * access the elements, the types given should be comparable by identity
 * (=== comparison).
 * We say that a bidirectional map has keys and values, associated.
 * The order of association is important, so for a BidirectionalMap<string, number>
 * you can accedd by value passing numbers, but not strings, and you can access
 * by key passing string, not numbers.
 */
export class BidirectionalMap<K, V> {
    private map: Map<K, V>;
    private reverseMap: Map<V, K>;
    public constructor(map?: [K, V][]) {
        this.map = new Map<K, V>(map);
        this.reverseMap = new Map<V, K>();
        for (const [key, value] of map) {
            this.reverseMap.set(value, key);
        }
    }

    /**
     * Returns true if this bidirectional map has the given key.
     * @param key The key to search
     */
    public hasKey(key: K): boolean {
        return !!this.map.has(key);
    }

    /**
     * Returns true if this bidirectional map has the given key as value.
     * @param key The key to search
     */
    public hasValue(key: V): boolean {
        return !!this.reverseMap.has(key);
    }

    /**
     * Retrieve the value associated with the given key in this bidirectional map.
     * @param key The key to retrieve the value from
     */
    public getByKey(key: K): V {
        return this.map.get(key);
    }

    /**
     * Retrieve the key associated with the given value in this bidirectional map.
     * @param value The value to retrieve the key from
     */
    public getByValue(value: V): K {
        return this.reverseMap.get(value);
    }

    /**
     * Set the value associated with the given key in this bidirectional map.
     * @param key The key to set the value to
     * @param value The value to set
     */
    public setByKey(key: K, value: V): void {
        this.map.set(key, value);
        this.reverseMap.set(value, key);
    }

    /**
     * Set the key associated with the given value in this bidirectional map.
     * @param value The value to set the key to
     * @param key The key to set
     */
    public setByValue(value: V, key: K): void {
        this.reverseMap.set(value, key);
        this.map.set(key, value);
    }

    /**
     * Return a simple map where the keys are this bidirectional map
     * keys, and the value it's associated values.
     */
    public getMapByKeys(): Map<K, V> {
        return this.map;
    }

    /**
     * Return a simple map where the keys are this bidirectional map
     * values, and the value it's associated keys.
     */
    public getMapByValues(): Map<V, K> {
        return this.reverseMap;
    }
}
