/**
 * Path resolver.
 *
 * @type {import('path').PlatformPath}
 */
const path = require('path');

/**
 * This configuration only overrides the TS paths.
 *
 * @type {import('@craco/types').CracoConfig}
 */
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@app': path.resolve(__dirname, 'src', 'app'),
            '@cli': path.resolve(__dirname, 'src', 'cli'),
            '@enums': path.resolve(__dirname, 'src', 'modules', 'enums'),
            '@interfaces': path.resolve(__dirname, 'src', 'modules', 'interfaces'),
            '@models': path.resolve(__dirname, 'src', 'modules', 'models'),
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@tools': path.resolve(__dirname, 'src', 'tools'),
            '@types': path.resolve(__dirname, 'src', 'types')
        }
    }
};
