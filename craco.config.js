/* eslint-disable */
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, {});
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
        plugins: [...emotionBabelPreset.plugins]
    }
};
