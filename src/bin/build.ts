/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import webpack from 'webpack';
import getWebpackProdConfig from '../webpack/getProdConfig';
import findConfig from '../config/find';
import loadConfig from '../config/load';

const configPath = findConfig();

export const build = (): void => {
  try {
    const config = loadConfig();
    const webpackProdConfig = getWebpackProdConfig({
      ...config,
      paths: {
        ...(config.paths || {}),
        config: configPath,
      },
    });

    webpack(webpackProdConfig, (err, stats) => { // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.error(stats.toString({
          chunks: false,
          colors: true,
        }));
      }
    });
  } catch (err) {
    console.error(err);
    console.error(`Error: can't find the configuration file located at ${configPath}.`);
  }
};

// when build.js is launched directly
if (module.id === require.main.id) {
  build();
}