
# ![bones icon](https://raw.githubusercontent.com/ArguelBenoit/BONES/master/firefox/icons/icon-32.png) Description of BONES

Bones is a browser extension, allowing to easily manage encrypted communication in rsa 2048 on the different text communication platforms. The extension offers different functionalities, such as: generating, naming and storing pairs of rsa keys, keeping the public keys of friends, sharing public keys. encrypt and decrypt messages. The extension is standalone. No server keeps data created and saved in bones, everything is kept locally.

---

# Compile source code

*Two versions can be deployed with the same code source, one for firefox, and another for chrome/chromium. The dist folders created following the various commands are ./firefox and ./chrome*

## Development

To develop and observe the modifications on the javascript and css files, execute one of the following commands

### Firefox

```
npm run dev:firefox
```

### Chrome/Chromium

```
npm run dev:chrome
```

## Production

### Firefox

```
npm run build:firefox
```

### Chrome/Chromium

```
npm run build:chrome
```
