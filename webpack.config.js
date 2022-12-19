const path = require('path');
const exec = require('node-async-exec');
const fs = require('fs');
const util = require('util');
const open = require('open');



// function de syncro entre les différents manifest.
function syncManifestAndPackage(path, originalManifest) {
  return new Promise((resolve, reject) => {

    const {
      name,
      version,
      description,
      homepage_url,
      author,
      license
    } = require('./package.json');

    const json = JSON.stringify(
      Object.assign(
        originalManifest,
        {
          name,
          version,
          author,
          license,
          description,
          homepage_url
        }
      ), null, 2 // indent
    );

    fs.writeFile(path, json, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


// Écrit dans un fichier .env.js l'objet des différents param
function createEnvFile(keysVals) {
  return new Promise((resolve, reject) => {
    keysVals = util.inspect(
      keysVals,
      {
        compact: false,
        depth: Infinity
      }
    );
    const jsText = `module.exports = ${keysVals};`;
    fs.writeFile('.env.js', jsText, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


module.exports = async env => {

  await createEnvFile({
    type: env.type,
    bro: env.bro
  });

  /**
   * commandes shell :
   * Suppression du dossier dist (chrome ou firefox)
   * Création des dossiers publics
   * Copie des assets (base-manifest, icon, html...)
   */
  [
    `rm -rf ${env.bro}`,
    `mkdir ${env.bro}`,
    `mkdir ${env.bro}/js`,
    `mkdir ${env.bro}/icons`,
    `cp src/assets/icons/** ${env.bro}/icons/`,
    `cp src/assets/**.html ${env.bro}/`
  ].forEach(async cmd => {
    try {
      await exec({
        cmd: cmd
      });
    } catch (err) {
      console.log(err);
    }
  });


  if (env.type === 'dev') {
    open(
      `file:///${path.join(__dirname, 'fake_chat.html')}`,
      { app: { name: env.bro === 'chrome' ? 'chromium' : 'firefox'}}
    );
  }


  /**
   * syncronisation du manifests avec le package
   */
  const baseManifest = require(`./src/assets/${env.bro}-base-manifest.json`);
  syncManifestAndPackage(`./${env.bro}/manifest.json`, baseManifest);


  return {
    mode: env.type === 'dev' ? 'development' : 'production', // env.type = dev || prod
    devtool: env.type === 'dev' ? 'source-map' : undefined,
    entry: {
      background: path.join(__dirname, 'src/Background.js'),
      content: path.join(__dirname, 'src/Content.js'),
      settings: path.join(__dirname, 'src/Settings.js'),
      popup: path.join(__dirname, 'src/Popup.js')
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
        Bin: path.resolve(__dirname, 'src/bin/'),
        Contexts: path.resolve(__dirname, 'src/contexts/'),
        Env: path.resolve(__dirname, '.env.js')
      }
    }
  };
};