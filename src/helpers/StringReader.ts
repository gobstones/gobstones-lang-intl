/**
 * This module exports a convenient class for reading
 * a string one character at a time, or one word at a time.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */

/**
 * The StringReader is the hearth on how the Gobstones Language code
 * is read for translation. The code passes through an instance of this
 * class, and is read one word at a time, maintaining characters that are non word
 * exactly as they are (preserves formatting of the code).
 *
 * The most important method in this class is probably the [[isAlpha]] method,
 * that states what characters should be considered part of a word, and which don't.
 * In order to better support UTF-8 this method should be revised in the future.
 */
export class StringReader {
    /**
     * The string given to the reader.
     */
    public str: string;
    /**
     * The current index where the reader is at.
     */
    public index: number;
    /**
     * The regexp used to detect when a word ends
     */
    private wordEnders: RegExp;

    /**
     * Create a new instance of a StringReader for the given string.
     * The reader starts at position 0 (the beginning of the string).
     *
     * @param str The string this reader should operate uppon.
     */
    public constructor(str: string, wordEnders: RegExp = /[^ \n\t()[\]{},;.:=><-]/) {
        this.str = str;
        this.index = 0;
        this.wordEnders = wordEnders;
    }

    /**
     * Peek on the next character in this reader, without consuming it.
     * If the reader is at the end of the file, undefined is returned.
     */
    public peekChar(): string {
        if (this.eof()) return undefined;
        return this.str.charAt(this.index);
    }

    /**
     * Consume and return the next character in this reader.
     * If the reader is at the end of the file, undefined is returned.
     */
    public nextChar(): string {
        if (this.eof()) return undefined;
        const char = this.peekChar();
        this.index++;
        return char;
    }

    /**
     * Peek on the next word (multiple characters) in this reader, without consuming it.
     * If the reader is at the end of the file, undefined is returned.
     */
    public peekWord(): string {
        if (this.eof()) return undefined;
        const currentIdx = this.index;
        const word = this.nextWord();
        this.index = currentIdx;
        return word;
    }

    /**
     * Consume and return the next word (multiple characters) in this reader.
     * If the reader is at the end of the file, undefined is returned.
     */
    public nextWord(): string {
        if (this.eof()) return undefined;
        const offset = this.offsetToNonAlpha();
        let currentIdx = 0;
        let word = '';
        while (currentIdx !== offset) {
            word += this.str.charAt(this.index + currentIdx);
            currentIdx++;
        }
        this.index += offset;
        return word;
    }

    /**
     * Returns whether or not the current element in this reader is a word.
     */
    public isWord(): boolean {
        if (this.eof()) return false;
        return this.isAlpha(this.str.charAt(this.index));
    }

    /**
     * Returns whether or not this reader has reach the end of the file.
     */
    public eof(): boolean {
        return this.index >= this.str.length;
    }

    /**
     * Returns the number of characters that needs to be consumed to end
     * the current word (that is, reach the non alpha character)
     */
    private offsetToNonAlpha(): number {
        let offset = 0;
        let currentChar = this.str.charAt(this.index + offset);
        while (this.isAlpha(currentChar)) {
            offset++;
            currentChar = this.str.charAt(this.index + offset);
        }
        return offset;
    }

    /**
     * Returns whether or not the given character is
     * an alphanumeric character (or a character that can form part of
     * a Gobstones Language identifier or keyword that requires translation).
     *
     * @todo There should be a way to provide the suffix to the reader in order
     * to avoid using it as a finishing character.
     *
     * @param char
     */
    private isAlpha(char: string): boolean {
        return this.wordEnders.test(char);
    }
}
