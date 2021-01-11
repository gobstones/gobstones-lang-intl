/**
 * @ignore
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import fs from 'fs';
import commander, { program } from 'commander';
import { availableLocales, LocaleName } from './translations';
import { intl, defaultLocale } from './translations';
import { GobstonesTranslator } from './models/Translator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require('../package.json');

interface CLIArguments {
    language: string;
    in: string;
    out: string;
    from?: string;
    to?: string;
    names?: string;
    locales?: string;
}

// Read from the package.json in order to retrieve the name and version
const name = (packageJSON.name as string).split('/').slice(-1).pop();
const version = packageJSON.version;

// Add translations and default language
const availableLangs = availableLocales.map((e) => '"' + e + '"').join(' | ');
const language = getUserLocale();
intl.setLanguage(language);

const generateCLI = (theProgram: commander.Command): commander.Command => {
    theProgram.name(name);
    theProgram.description(intl.translate('cli.descriptions.tool'));
    theProgram.version(version, '-v, --version', intl.translate('cli.descriptions.version'));
    theProgram.helpOption('-h, --help', intl.translate('cli.descriptions.help'));
    theProgram.addHelpCommand(false);

    withGeneralOptions(theProgram.command('translate [code]'), true, true)
        .description(intl.translate('cli.translate.description'))
        .action((code: string, cmdArgs: CLIArguments) => {
            validateLanguageFlag(cmdArgs.language);
            const input = cmdArgs.in !== undefined ? readFileInput(cmdArgs.in) : code;
            const translator = new GobstonesTranslator({
                from: cmdArgs.from,
                to: cmdArgs.to,
                names: cmdArgs.names ? parseJSON(cmdArgs.names) : undefined,
                locales: cmdArgs.locales ? parseJSON(cmdArgs.locales) : undefined
            });
            const output = translator.translate(input);
            if (cmdArgs.out) {
                writeToFile(cmdArgs.out, output);
            } else {
                writeToConsole(output);
            }
        });

    withGeneralOptions(theProgram.command('toTokens'), true, false).description(
        intl.translate('cli.toTokens.description')
    );

    withGeneralOptions(theProgram.command('fromTokens'), false, true).description(
        intl.translate('cli.fromTokens.description')
    );

    return theProgram;
};

const withGeneralOptions = (
    command: commander.Command,
    useFrom = false,
    useTo = false
): commander.Command => {
    command
        .option(
            '-l, --language <locale>',
            intl.translate('cli.descriptions.language', { availableLangs }),
            language
        )
        .option('-i, --in <filename>', intl.translate('cli.descriptions.file'))
        .option('-o, --out <filename>', intl.translate('cli.descriptions.out'))
        .option('-n, --names <JSONObject>', intl.translate('cli.descriptions.names'))
        .option('-n, --locales <JSONObject>', intl.translate('cli.descriptions.locales'));
    if (useFrom) {
        command.requiredOption('-f, --from <locale>', intl.translate('cli.descriptions.from'));
    }
    if (useTo) {
        command.requiredOption('-t, --to <locale>', intl.translate('cli.descriptions.to'));
    }
    return command;
};

const validateLanguageFlag = (lang: string): void => {
    ensureOrFailAndExit(
        availableLocales.indexOf(lang) !== -1,
        intl.translate('cli.errors.language', { lang, availableLangs })
    );
};

const parseJSON = (location: string, value?: string): any => {
    if (value === undefined) return undefined;
    try {
        return JSON.parse(value);
    } catch (e) {
        ensureOrFailAndExit(false, intl.translate('cli.errors.json', { location }));
    }
};
const readFileInput = (fileName: string): string => {
    ensureOrFailAndExit(fs.existsSync(fileName), intl.translate('cli.errors.file', { fileName }));
    return fs.readFileSync(fileName).toString();
};

const writeToFile = (fileName: string, contents: string): void =>
    fs.writeFileSync(fileName, contents);

const writeToConsole = (contents: string): void =>
    // eslint-disable-next-line no-console
    console.log(contents);

const ensureOrFailAndExit = (condition: boolean, error: string): void => {
    if (!condition) {
        // eslint-disable-next-line no-console
        console.error(error);
        process.exit(1);
    }
};

export const cli = generateCLI(program);
cli.parse(process.argv);

function getUserLocale(): LocaleName {
    const env = process.env ?? {};
    const locale: string = env.LC_NAME ?? env.LC_ALL ?? env.LC_MESSAGES ?? env.LANG ?? env.LANGUAGE;
    if (locale) {
        for (const localeName in availableLocales) {
            if (locale.indexOf(localeName) >= 0) {
                return localeName as LocaleName;
            }
        }
    }
    return defaultLocale;
}
