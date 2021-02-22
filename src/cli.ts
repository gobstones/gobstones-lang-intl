import { GobstonesTranslator } from './models/GobstonesTranslator';
import { cli } from '@gobstones/gobstones-core/cli';
import { intl } from './translations';

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
const versionNumber = packageJSON.version;

cli({
    translator: intl,
    texts: {
        name,
        versionNumber,
        help: 'cli.descriptions.help',
        tool: 'cli.descriptions.tool',
        language: 'cli.descriptions.language',
        languageError: 'cli.errors.language',
        version: 'cli.descriptions.version'
    }
})
    .command('translate [code]', 'cli.translate.description', (cmd) => {
        cmd.input('cli.descriptions.in', 'cli.errors.file')
            .output('cli.descriptions.out')
            .option('-f, --from <locale>', 'cli.descriptions.from')
            .option('-t, --to <locale>', 'cli.descriptions.to')
            .option('-n, --names <JSONObject>', 'cli.descriptions.names')
            .option('-L, --locales <JSONObject>', 'cli.descriptions.locales')
            .action((app, _, opts: CLIArguments) => {
                app.outputHelpOnNoArgs();
                const input = app.read();
                const translator = new GobstonesTranslator({
                    from: opts.from,
                    to: opts.to,
                    names: opts.names ? parseJSON(app, opts.names) : undefined,
                    locales: opts.locales ? parseJSON(app, opts.locales) : undefined
                });
                const output = translator.translate(input);
                app.write(output);
            });
    })
    .command('toTokens [code]', 'cli.toTokens.description', (cmd) => {
        cmd.input('cli.descriptions.in', 'cli.errors.file')
            .output('cli.descriptions.out')
            .option('-f, --from <locale>', 'cli.descriptions.from')
            .option('-n, --names <JSONObject>', 'cli.descriptions.names')
            .option('-L, --locales <JSONObject>', 'cli.descriptions.locales')
            .action((app, _, opts: CLIArguments) => {
                app.outputHelpOnNoArgs();
                const input = app.read();
                const translator = new GobstonesTranslator({
                    from: opts.from,
                    names: opts.names ? parseJSON(app, opts.names) : undefined,
                    locales: opts.locales ? parseJSON(app, opts.locales) : undefined
                });
                const output = translator.toTokens(input);
                app.write(output);
            });
    })
    .command('fromTokens [code]', 'cli.fromTokens.description', (cmd) => {
        cmd.input('cli.descriptions.in', 'cli.errors.file')
            .output('cli.descriptions.out')
            .option('-t, --to <locale>', 'cli.descriptions.to')
            .option('-n, --names <JSONObject>', 'cli.descriptions.names')
            .option('-L, --locales <JSONObject>', 'cli.descriptions.locales')
            .action((app, _, opts: CLIArguments) => {
                app.outputHelpOnNoArgs();
                const input = app.read();
                const translator = new GobstonesTranslator({
                    to: opts.to,
                    names: opts.names ? parseJSON(app, opts.names) : undefined,
                    locales: opts.locales ? parseJSON(app, opts.locales) : undefined
                });
                const output = translator.fromTokens(input);
                app.write(output);
            });
    })
    .run();

const parseJSON = (app: any, location: string, value?: string): any => {
    if (value === undefined) return undefined;
    try {
        return JSON.parse(value);
    } catch (e) {
        app.ensureOrFailAndExit(false, intl.translate('cli.errors.json', { location }));
    }
};
