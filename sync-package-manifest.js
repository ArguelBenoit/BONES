const fs = require('fs');
const firefoxManifest = require('./firefox/manifest.json');
const chromeManifest = require('./chrome/manifest.json');
const {
  name,
  version,
  author,
  license,
  description,
  homepage_url
} = require('./package.json');


function createJson(path, originalManifest) {
  return new Promise((resolve, reject) => {

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

createJson('./firefox/manifest.json', firefoxManifest);
createJson('./chrome/manifest.json', chromeManifest);