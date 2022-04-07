const path = require('path');
const fs = require('fs');
const util = require('util');




// Écrit dans un fichier .env.js l'objet des différents param
function createFile(keysVals) {
  return new Promise((resolve, reject) => {
    keysVals = util.inspect(
      keysVals,
      {
        compact: false,
        depth: Infinity
      }
    );
    const jsText = `module.exports = ${keysVals};`;
    fs.writeFile('.env.js', jsText, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}




module.exports = async env => {

  await createFile({
    type: env.type,
    bro: env.bro
  });

  return {
    mode: env.type === 'dev' ? 'development' : 'production', // env.type = dev || prod
    devtool: env.type === 'dev' ? 'source-map' : undefined,
    entry: {
      background: path.join(__dirname, 'src/background.js'),
      content: path.join(__dirname, 'src/content.js'),
      index: path.join(__dirname, 'src/index.js')
    },
    output: {
      path: path.join(__dirname, `${env.bro}/js`), // env.bro = firefox || chrome
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
                  path.resolve(__dirname, 'src/styles/var.less')
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
        '~': path.resolve(__dirname),
        Views: path.resolve(__dirname, 'src/views/'),
        Styles: path.resolve(__dirname, 'src/styles/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Images: path.resolve(__dirname, 'src/images/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Contexts: path.resolve(__dirname, 'src/contexts/'),
        Env: path.resolve(__dirname, '.env.js')
      }
    }
  };

};
