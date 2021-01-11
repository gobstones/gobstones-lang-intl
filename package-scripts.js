/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf, copy } = require('nps-utils');

const paths = {
    grammarFile: './src/grammar/gbb-grammar.ne',
    grammarOutput: './src/grammar/gbb-grammar.js',
    grammarDocs: './docs/gbb-parser.html'
};

module.exports = {
    scripts: {
        default: 'nps start',
        /*
         * Run the index in development mode
         */
        start: {
            script: run('./src/index.ts'),
            description: 'Run the index in development mode'
        },
        /*
         * Build the application for deployment
         */
        build: {
            script: series(
                'nps clean.dist',
                'webpack',
                rename('dist/gobstones-lang-intl.js', 'dist/gobstones-lang-intl'),
                chmod('+x', 'dist/gobstones-lang-intl')
            ),
            description: 'Build the application into the dist folder'
        },
        /*
         * Run the tests
         */
        test: {
            script: jest(),
            description: 'Run the index in development mode'
        },
        /**
         * Helpers
         */
        clean: {
            dist: {
                script: rimraf('./dist'),
                description: 'Delete the dist folder',
                hiddenFromHelp: true,
                silent: true
            },
            docs: {
                script: rimraf('./docs'),
                description: 'Delete the docs folder',
                hiddenFromHelp: true,
                silent: true
            }
        },
        prettify: {
            script: prettier('./src/**/*.ts'),
            description: 'Run Prettier on all the files',
            hiddenFromHelp: true
        },
        lint: {
            script: eslint('./src'),
            description: 'Run ESLint on all the files',
            hiddenFromHelp: true
        },
        doc: {
            script: series(
                'nps clean.docs',
                typedoc(),
                copy('./docs/index.html ./docs --rename globals.html')
            ),
            description: 'Run Typedoc and generate docs',
            hiddenFromHelp: true,
            serve: {
                script: series(
                    'nps doc',
                    serve('./docs')
                ),
                description: 'Generate and serve the docs as static files',
                hiddenFromHelp: true,
            }
        }

    }
};

function jest(tests) {
    return series(
        'nps lint',
        tests ? 'jest -t "' + tests + '"' : 'jest',
    );
}

function run(path) {
    return `ts-node ${path}`;
}

function rename(src, dest) {
    return `move-file ${src} ${dest}`;
}

function chmod(args, file) {
    return `chmod ${args} ${file}`;
}

function eslint(path) {
    return `eslint ${path} --format stylish --ext ts --color`;
}

function prettier(path) {
    return `prettier --write ${path}`;
}

function typedoc(path) {
    return `typedoc`;
}

function serve(path) {
    return `serve ${path}`;
}
