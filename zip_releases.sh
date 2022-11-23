
# 1) npm run build
# 2) delete js/**.map.js
# 3) variable version récupéré dans package.json
# 4) zip du dossier chrome, nommé bones_chrome_v${version}.zip
# 4) zip du dossier firefox, nommé firefox_chrome_v${version}.zip
# 6) zip du code pour l'audit firefox nommé bones_audit_v${version}.zip
#    avec comme élément :
#     - ./chrome
#     - ./firefox
#     - ./src
#     - .env.js
#     - .babelrc
#     - package.json
#     - README.md
#     - webpack.config.js

