/* eslint-disable */
/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */
const {
    concurrent,
    series,
    nps,
    run,
    webpack,
    typedoc,
    jest,
    prettier,
    eslint,
    serve,
    remove,
    copy,
    onchange
} = require('./nps-tooling');

module.exports = {
    scripts: {
        default: nps('dev'),
        /*
         * Run the index in development mode
         */
        dev: {
            script: run('./src/index.ts'),
            description: 'Run the index in development mode',
            watch: {
                script: onchange('./src/**/*.ts', run('./src/index.ts'))
            }
        },
        /*
         * Build the application for deployment
         */
        build: {
            script: series(nps('clean.dist'), webpack()),
            description: 'Build the application into the dist folder'
        },
        /*
         * Run the tests
         */
        test: {
            script: series(nps('clean.coverage'), nps('lint'), jest()),
            description: 'Run the index in development mode',
            serve: {
                script: series(
                    nps('clean.coverage'),
                    nps('lint'),
                    jest('--coverageThreshold "{}"'),
                    serve('./coverage')
                ),
                description: 'Serve the coverage report produced by jest'
            }
        },
        /**
         * Helpers
         */
        clean: {
            dist: {
                script: remove('./dist'),
                description: 'Delete the dist folder',
                hiddenFromHelp: true,
                silent: true
            },
            docs: {
                script: remove('./docs'),
                description: 'Delete the docs folder',
                hiddenFromHelp: true,
                silent: true
            },
            coverage: {
                script: remove('./coverage'),
                description: 'Delete the coverage folder',
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
            script: series(eslint('./src'), eslint('./test')),
            description: 'Run ESLint on all the files',
            hiddenFromHelp: true,
            fix: {
                script: series(eslint('./src', true), eslint('./test', true)),
                description: 'Run ESLint on all the files with --fix',
                hiddenFromHelp: true
            }
        },
        doc: {
            script: series(
                nps('clean.docs'),
                typedoc(),
                copy('./docs/index.html', './docs/globals.html')
            ),
            description: 'Run Typedoc and generate docs',
            hiddenFromHelp: true,
            serve: {
                script: series('nps doc', serve('./docs')),
                description: 'Generate and serve the docs as static files',
                hiddenFromHelp: true
            },
            watch: {
                script: series(
                    nps('clean.docs'),
                    concurrent(serve('./docs'), onchange('./src/**/*.ts', nps('doc')))
                )
            }
        }
    }
};
