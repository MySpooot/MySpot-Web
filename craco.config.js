/* eslint-disable */
const cracoSwcPlugin = require('craco-swc');

module.exports = {
    plugins: [
        {
            plugin: cracoSwcPlugin,
            options: {
                swcLoaderOptions: {
                    jsc: {
                        externalHelpers: true,
                        target: 'es5',
                        parser: {
                            syntax: 'typescript',
                            tsx: true,
                            dynamicImport: true
                        }
                    }
                }
            }
        }
    ],
    babel: {
        plugins: ['@emotion/babel-plugin'],
        presets: ['@emotion/babel-preset-css-prop']
    }
};
