#!/bin/bash

#   +-----------------------------------------------------------------------------+
#   |   Ce script fait les 3 archives de release dans un dossier parent. Il       |
#   |   necessite jq, disponible sur les depots apt ou snap Attention, mettre à   |
#   |   jour le numéro de version dans package.json avant de lancer ce script.    |
#   +-----------------------------------------------------------------------------+

version=$(jq -r '.version' package.json)
browser=(firefox chrome)

# suppréssion de la même release des dossiers dist et création du dossier pour les zip
rm -rf ./firefox ./chrome ../bones_release_v${version}
mkdir ../bones_release_v${version}

for i in ${browser[@]}
do
    # build
    npm run build:$i
    # zipage ^^ de l'archive
    cd ${i} && zip -r ../bones_${i}_v${version}.zip * && cd ..
    # mv de l'archive dans le dossier release
    mv bones_${i}_v${version}.zip ../bones_release_v${version}
done

# zipage ^^ des fichiers necessaires pour l'audit de code firefox
zip -r bones_audit_firefox_v${version}.zip \
    firefox \
    src \
    .babelrc \
    package.json \
    README.md \
    webpack.config.js \

# mv de l'archive dans le dossier release
mv bones_audit_firefox_v${version}.zip ../bones_release_v${version}
