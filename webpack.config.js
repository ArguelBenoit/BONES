
const {
  createEnvFile,
  creatingDistFolders,
  syncManifestAndPackage,
  pathJoin,
  pathResolve
} = require('./webpack.utils.js');


module.exports = async env => {

  const { type, bro } = env;
  const pathManifest = `./src/assets/${bro}-base-manifest.json`;
  const baseManifest = require(pathManifest);

  await createEnvFile({ type, bro });
  await creatingDistFolders(bro)
  await syncManifestAndPackage(`./${bro}/manifest.json`, baseManifest);

  return {
    mode: type === 'dev' ? 'development' : 'production', // env.type = dev || prod
    devtool: type === 'dev' ? 'source-map' : undefined,
    entry: {
      background: pathJoin('src/Background.js'),
      content: pathJoin('src/Content.js'),
      settings: pathJoin('src/Settings.js'),
      popup: pathJoin('src/Popup.js')
    },
    output: {
      path: pathJoin(`${bro}/js`), // env.bro = firefox || chrome
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  pathResolve('src/styles/var.less')
                ]
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpeg|jpg|svg)$/i,
          use: [
            'url-loader'
          ]
        }
      ]
    },
    // alias
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.css'],
      alias: {
        '~': pathResolve(__dirname),
        Views: pathResolve('src/views/'),
        Styles: pathResolve('src/styles/'),
        Components: pathResolve('src/components/'),
        Images: pathResolve('src/images/'),
        Bin: pathResolve('src/bin/'),
        Contexts: pathResolve('src/contexts/'),
        Env: pathResolve('.env.js')
      }
    }
  };
};