#!/bin/bash
# Ce script fait les 3 archives de release dans un dossier parent.
# Attention, mettre à jour le numéro de version dans package.json
# avant de le lancer

# 0) version dans package.json
version="1.1.0"

# 1) npm run build
npm run build:firefox && npm run build:chrome

# 2) delete js/**.map.js
rm rf -f firefox/js/**.js.map chrome/js/**.js.map

# 4) zip des deux archives de version chrome et firefox
zip -r bones_chrome_v${version}.zip chrome/**
zip -r bones_firefox_v${version}.zip firefox/**

# 5) zip de l'archive pour l'audit firefox (seulement les fichiers necessaire)
zip -r bones_audit_firefox_v${version}.zip firefox src .babelrc package.json README.md webpack.config.js

# 6) suppression et création du dossier release
rm -rf ../bones_release_v${version} 
mkdir ../bones_release_v${version}

# 7) déplacement des archives dans le dossier release
mv bones_chrome_v${version}.zip ../bones_release_v${version}
mv bones_firefox_v${version}.zip ../bones_release_v${version}
mv bones_audit_firefox_v${version}.zip ../bones_release_v${version}

# TODO version package.json
# replace . by - dans version
# ziper chrome et firefox à la racine