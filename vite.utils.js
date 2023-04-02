import exec from 'node-async-exec';
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react'


/**
 * commandes shell :
 * Suppression du dossier dist (chrome ou firefox)
 * Création des dossiers publics
 * Copie des assets (base-manifest, icon, html...)
 */
export async function distGenerating(browser) {
  [
    `rm -rf ${browser}`,
    `mkdir ${browser}`,
    `mkdir ${browser}/js`,
    `mkdir ${browser}/icons`,
    `cp src/assets/icons/** ${browser}/icons/`,
    `cp src/assets/**.html ${browser}/`
  ].forEach(async cmd => {
    try {
      await exec({
        cmd: cmd
      });
    } catch (err) {
      console.log(err);
    }
  });
}


// function de syncro entre les différents le manifest et le package.json
export async function syncManifestAndPackage(browser) {
  return new Promise(async (resolve, reject) => {

    const baseManifest = JSON.parse(
      fs.readFileSync(
        new URL(
          `./src/assets/${browser}-base-manifest.json`,
          import.meta.url
        )
      )
    );

    const {
      name,
      version,
      description,
      homepage_url
    } = require('./package.json');

    const json = JSON.stringify(
      Object.assign(
        baseManifest,
        {
          name,
          version,
          description,
          homepage_url
        }
      ), null, 2 // indent
    );

    fs.writeFile(`./${browser}/manifest.json`, json, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


/**
 * retourne la configuration
 * @param {string} mode, 'development' | 'production',
 * @param {string} browser, 'firefox' | 'chrome' 
 */
export function configurationCreated( mode, browser ) {
  return {
    mode,
    devtool: mode === 'development' ? 'source-map' : false,
    build: {
      outDir: path.join(__dirname, `${browser}/js`),
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        input: {
          background: path.join(__dirname, 'src/Background.js'),
          content: path.join(__dirname, 'src/Content.jsx'),
          settings: path.join(__dirname, 'src/Settings.jsx'),
          popup: path.join(__dirname, 'src/Popup.jsx'),
        },
      },
    },
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
        Env: path.resolve(__dirname, '.env.js'),
      },
    },
    plugins: [react()],
    esbuild: {
      // jsxInject: `import React from 'react'`,
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment'
    }
  }
}