const path = require('path');
const exec = require('node-async-exec');
const fs = require('fs');
const util = require('util');



// function de syncro entre les différents manifest.
function syncManifestAndPackage(path, originalManifest) {
  return new Promise((resolve, reject) => {

    const {
      name,
      version,
      description,
      homepage_url
    } = require('./package.json');

    const json = JSON.stringify(
      Object.assign(
        originalManifest,
        {
          name,
          version,
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
};


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
};


function creatingDistFolders (browserName) {
  return new Promise((resolve, reject) => {
    /**
     * commandes shell :
     * Suppression du dossier dist (chrome ou firefox)
     * Création des dossiers publics
     * Copie des assets (base-manifest, icon, html...)
     */
    [
      `rm -rf ${browserName}`,
      `mkdir ${browserName}`,
      `mkdir ${browserName}/js`,
      `mkdir ${browserName}/icons`,
      `cp src/assets/icons/** ${browserName}/icons/`,
      `cp src/assets/**.html ${browserName}/`
    ].forEach(async cmd => {
      try {
        await exec({
          cmd: cmd
        });
        resolve()
      } catch (err) {
        reject(err)
      }
    });
  });
};


function pathJoin(pathName) {
  return pathName
    ? path.join(__dirname, pathName)
    : path.join(__dirnamepathResolve);
};


function pathResolve(pathName) {
  return pathName
    ? path.resolve(__dirname, pathName)
    : path.resolve(__dirname);
};


module.exports = {
  creatingDistFolders,
  createEnvFile,
  syncManifestAndPackage,
  pathJoin,
  pathResolve
};