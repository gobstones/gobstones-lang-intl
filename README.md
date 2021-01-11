# gobstones-lang-intl

A library for translating the Gobstones Language built-ints and keywords into diferent locales.

## Install

Install with **npm** by using

```
npm install @gobstones/gobstones-lang-intl
```

## Usage

This library can be used in different ways to abstract away the language in which the user is using the Gobstones Language. Next we will show some different ways in which to use the library:

#### From code to keywords

Get a code with keywords and built-ins replaced to a set of token names in every space. So, the following code:

```
program { Poner(Rojo) }
```

will be translated to (considering the above code in spanish):
```
$GBS_DEFINITION_PROGRAM$ { $GBS_COMMAND_GRAB$($GBS_COLOR_RED$) }
```

The output is what is expected internally by the parser and other tools. To produce this, you can use the library as follows:


```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({fromLang: 'es'});

let codeWithKeywords = gobstonesLangIntl.toKeywords(codeInSpanish);
```

#### From keywords to code

You can do the reverse trip, grabbing a code with tokens in it, and producing keywords in it's place:

So
```
$GBS_DEFINITION_PROGRAM$ { $GBS_COMMAND_GRAB$($GBS_COLOR_RED$) }
```

will be translated to spanish as:
```
program { Poner(Rojo) }
```

and to english as:
```
program { Grab(Red) }
```

For this behavior use the library in the following way:

```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({toLang: 'es'});

let codeInSpanish = gobstonesLangIntl.fromKeywords(codeWithKeywords);
```


#### Translating between different languages

You can to the trip from code to keywords, and to keywords from code, in a two way trip, but we provide a way to do it easily by providing both `fromLang` and `toLang` to the constructor and calling translate:

```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({fromLang: 'es', toLang: 'en'});

let codeInEnglish = gobstonesLangIntl.translate(codeInSpanish);
```

Note that you cannot call translate if you didn't provide both languages. See the errors section for more information about that.

#### Translating procedure and function names

You can pass a `namesMatch` argument, as a `Record<string, string>` object, such that the keys are the names of procedures, functions and others in the from language, and the value the string that you want to use in the to language. This allows you to translate more complex code, such as:

```
program {
    Poner3BolitasDeColor_(Rojo)
}

procedure Poner3BolitasDeColor_(colorAPoner) {
    repeat (3) {
        Poner(colorAPoner)
    }
}
```

can be translated to English by using the library as follows:

```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({
    fromLang: 'es',
    toLang: 'en',
    names: {
        'Poner3BolitasDeColor_': 'Grab3StonesOfColor_',
        'colorAPoner': 'colorToGrab'
    }
});

let codeInEnglish = gobstonesLangIntl.translate(codeInSpanish, {includeNames: true});
```

This will produce the following output:

```
program {
    Grab3StonesOfColor_(Red)
}

procedure Grab3StonesOfColor_(colorAPcolorToGraboner) {
    repeat (3) {
        Grab(colorToGrab)
    }
}
```

As a caveat, note that there is no context detection of the name usage, and the names are replaces as a mere string replacement technic. This means that we cannot distinguish between different parameters with the same name, and assign different names to each of them.

Also note that you can produce keywords including the name replacement by passing `includeNames` as true to `toKeywords` as well.

```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({
    fromLang: 'es',
    toLang: 'en',
    names: {
        'Poner3BolitasDeColor_': 'Grab3StonesOfColor_',
        'colorAPoner': 'colorToGrab'
    }
});

let codeWithKeywordsWithEnglishNames =
    gobstonesLangIntl.toKeywords(codeInSpanish, {includeNames: true});
```

## Custom Language

You can use a custom language by providing a `languages` object, where each key corresponds to the locale name, and as a value, you can use an language object, containing the gobstones keywords as keys, and the string to use in that language as value. A language object may include the additional `extends` key, to specify that a language is just an extension of another, in which case, the defined translations are overwritten from the extended language.

```typescript
import GobstonesLangIntl from 'gobstones-lang-intl';

let gobstonesLangIntl = new GobstonesLangIntl({
    fromLang: 'en-GB',
    toLang: 'fr',
    languages: {
        'en-GB': {
            extends: 'en',
            GBS_TYPE_COLOR: 'Colour'
        },
        'fr': {
            GBS_GRAB: 'Prenez',
            GBS_COLOR_RED: 'Rouge'
            ...
        }
    }
});

let codeInFrench =
    gobstonesLangIntl.translate(codeInBritishEnglish);
```

Note that if your language does not extend another, you must specify all keywords of the Gobstones Language in order for the translation to be correct. Failing to do so will produce an error.

Once a language is added to your object, you can use it in both `fromLang` and `toLang`.

## Supported Locales

By default the following languages are supported as built-in:

* en: (keywords in english, built-ins in english)
* es: (keywords in english, built-ins in spanish)
* es-full: (keywords in spanish, built-ins in spanish) NOT IMPLEMENTED YET
* pt: (keywords in english, built-ins in portuguese) NOT IMPLEMENTED YET
* pt-full: (keywords in portuguese, built-ins in portuguese) NOT IMPLEMENTED YET

Check out the language definitions in `./src/translations` to see how to provide your custom languages.

## Errors

The arguments `fromLang` and `toLang` should be used carefully, according to what you want to produce. The following errors may be found on misusage:

* **`NonExistentLocaleGiven`**: When a locale name is used in `fromLang`or `toLang` but there is no locale definition built-in or user defined with that name. This also occurs when attempting to extend a language via `languages` using the `extends` key for a language that is not defined.
* **`LocaleNameCollision`**: When adding a locale name to `languages` that is already defined.
* **`NoFromLanguageGiven`**: When attempting to use `translate` or `toKeywords` to an GobstonesLangIntl created with no `toLang` given to the constructor.
* **`NoToLanguageGiven`**: When attempting to use `translate` or `fromKeywords` to an GobstonesLangIntl created with no `fromLang` given to the constructor.
* **`NoNamesGiven`**: When attempting to use `translate` or `toKeywords` to an GobstonesLangIntl created with no `name` given to the constructor.

## Caveats

There's a caveat with how language translation works. We replace keywords and built-ins in the from language to their corresponding counterpart in the to language, but procedure names, functions names, type names, variables and others are not translated, as they have semantic meaning that cannot be assumed by the tool. Yet you can provide the `names`argument to assist in that sense.

This implies that when generating Gobstones Abstract code should use a prefix and a suffix that is not part of the language to identify a token as such, and avoid collision with procedure names.Although the names os the tokens are rare enough, but problems may arise, see the following example in spanish:

```
program {
    Poner(Rojo)
    GBS_COMMAND_DROP(Azul)
}

procedure GBS_COMMAND_DROP(color) {
    Poner(color)
    Poner(color)
}
```

When transformed to a Gobstones Abstract code without using prefixes or suffixes, the output is as follows:

```
GBS_DEFINITION_PROGRAM {
    GBS_COMMAND_DROP(GBS_COLOR_RED)
    GBS_COMMAND_DROP(GBS_COLOR_BLUE)
}

procedure GBS_COMMAND_DROP(color) {
    GBS_COMMAND_DROP(color)
    GBS_COMMAND_DROP(color)
}
```

As you can see, the name of the procedure collides with the token used for `Poner`(Drop). Now, when translating back to english, the different calls cannot be identify as belonging to a token
or to the procedure name. By using a prefix and a suffix the tokens are well delimited, and the output becomes the following:

```
$GBS_DEFINITION_PROGRAM$ {
    $GBS_COMMAND_DROP$($GBS_COLOR_RED$)
    GBS_COMMAND_DROP($GBS_COLOR_BLUE$)
}

procedure GBS_COMMAND_DROP(color) {
    $GBS_COMMAND_DROP$(color)
    $GBS_COMMAND_DROP$(color)
}
```

Now, when translating back to english, only the words that have the prefix and suffix are marked as a call to `Poner`, but calls to the procedure remain untouched.

## For developers

### Basic commands

You can clone this project and perform the mandatory `npm install` once in the folder.
After that, you can run the code in `./src/index.ts` with `ts-node` by running

```bash
npm start
```

This may be useful for simple testing purposes, although what we recommend is to run the tests, which are written in Jest, by using:

```bash
npm test
```

If you want to build the tool for distribution, run:
```
npm start build
```

This will generate the output in the 'dist' folder. Both the typings and and index.js file will be generated.

You may also want to generate and read the API docs (By using TypeDoc), by running:
```
npm start doc
```

Or if you want, you can run a server with those docs by running:
```
npm start doc.serve
```

The tool uses 'nps' to run scripts, and you may find all scripts by checking 'package-scripts.js'.
Other internal tools provided include prettifying and linting, as well as cleaning some temporary folders.

### Code organization

The code works by reading the code a word at a time, and attempting to match the word to a registered set of words that reside in a map.

Most of the code reside in '.src/models/Translator.ts' in the `GobstonesTranslator` class. This is the main exported class that allows us to create an instance with a specific configuration, and then perform the translations. You can also find interfaces for the types of the different options the class could receive, both in the constructor and in methods.

The file './src/models/Definitions.ts' contains the definition for a Gobstones language locale definitions. In './src/models/Errors.ts' you may find the different classes used for specific errors.

The './src/helpers' folder contains two files, that provide classes that assist the `GobstonesTranslator` in it's internal working. 'StringReader.ts' provides the class `StringReader`that allows for reading a string word by word. The 'BidirectionalMap.ts' file exports the `BidirectionalMap` class that allows for creating maps that can be accessed both by key or by value (internally it works by storing two maps, nothing fancy).

If you wish to understand more about the code, we recommend reading the API docs by running
```
npm start doc.serve
```
and the accessing 'localhost:5000', as all the code is documented.

#### Contributing

See the Gobstones Platform Contributions Guidelines to contribute.
