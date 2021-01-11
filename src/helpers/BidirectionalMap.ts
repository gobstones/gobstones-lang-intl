/**
 * This module exports a convenient class for a bidirectional map.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

export class BidirectionalMap<K, V> {
    private map: Map<K, V>;
    private reverseMap: Map<V, K>;
    public constructor(map: [K, V][]) {
        this.map = new Map<K, V>(map);
        this.reverseMap = new Map<V, K>();
        for (const [key, value] of map) {
            this.reverseMap.set(value, key);
        }
    }

    public hasKey(key: K): boolean {
        return !!this.map.has(key);
    }

    public hasKeyRev(key: V): boolean {
        return !!this.reverseMap.has(key);
    }

    public getKey(key: K): V {
        return this.map.get(key);
    }

    public getKeyRev(key: V): K {
        return this.reverseMap.get(key);
    }

    public setKey(key: K, value: V): void {
        this.map.set(key, value);
    }

    public setKeyRev(key: V, value: K): void {
        this.reverseMap.set(key, value);
    }

    public getMap(): Map<K, V> {
        return this.map;
    }

    public getMapRev(): Map<V, K> {
        return this.reverseMap;
    }
}
