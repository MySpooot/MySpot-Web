const cracoAlias = require('craco-alias');
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, {});

module.exports = {
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                source: 'tsconfig',
                tsConfigPath: 'tsconfig.base.json',
                baseUrl: './src'
            }
        }
    ],
    babel: {
        plugins: [...emotionBabelPreset.plugins]
    }
};
