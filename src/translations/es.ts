/**
 * @ignore
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
/* eslint-disable max-len */
import { Locale } from './Locale';

export const es: Locale = {
    errors: {
        NonExistentLocaleGiven:
            'El idioma ${localeName} dado a ${attribute} no está registrado, ni en los idiomas por defecto ni como idioma definido por el usuario. ¿Olvidaste agregar el elemento al atributo "languages"?',
        NoFromLanguageGiven:
            'Se intentó realizar una traducción o pasar a keywords sin haber registrado un valor en el atributo "fromLang".',
        NoToLanguageGiven:
            'Se intentó realizar una traducción o leer de keywords sin haber registrado un valor en el atributo "toLang".',
        NoNamesGiven:
            'Se intentó realizar una traducción con la opción "includeNames" configurada, pero no hay nombres registrados. O bien remueva la opción "includeNames"o bien registre elementos en el atributo "names" al construir el traductor.',
        LocaleNameCollision:
            'Se intentó definir un lenguaje que se encuentra previamente definido. El lenguaje ofensor es: "${localeName}".'
    },
    cli: {
        descriptions: {
            tool: 'Una herramienta para traducir código en Lenguaje Gobstones',
            version: 'Mostrar la información de versión',
            help: 'Mostrar la ayuda de la herramienta',
            language: 'Seleccionar el idioma en el que la herramienta funciona internamente',
            in:
                'Seleccionar el archivo desde el cual leer el código a traducir. Si no se provee, los contenidos se esperan en la línea de comandos.',
            out:
                'Seleccionar el archivo de salida en el cual guardar los resultados. Si no se provee, los resultados se muestran en stdout',
            from: 'El locale desde el cual traducir código',
            to: 'El locale al cual traducir código',
            names: 'Un objecto JSON conteniendo transformaciones de nombres',
            locales: 'Una serie de locales adicionales para traducir el código.'
        },
        translate: {
            description:
                'Traducir Código Gobstones Localizado desde el locale "from" al locale "to"'
        },
        fromTokens: {
            description:
                'Traducir código Gobstones Abstracto a código Gobstones Localizado en locale "to"'
        },
        toTokens: {
            description:
                'Traducir código Gobstones Localizado en locale "from" a código Gobstones Abstracto'
        },
        errors: {
            language:
                'Especificaste el idioma "${lang}", pero no es un idioma válido, seleccione uno de ${availableLangs}.',
            file: 'El archivo ${fileName} no existe o no se puede leer.'
        }
    }
};
