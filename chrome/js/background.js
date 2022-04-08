/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.env.js":
/*!*****************!*\
  !*** ./.env.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  type: 'dev',
  bro: 'chrome'
};

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Utils/web-ext.js */ "./src/utils/web-ext.js");


var activeTab = function activeTab() {
  Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().tabs.query({
    title: 'BONES !#@$'
  }).then(function (tabs) {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      var id = tabs[0].id;
      Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().tabs.update(id, {
        active: true
      }); // sinon l'onglet n'existe pas
    } else {
      // on ouvre un onglet BONES
      var url = Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().extension.getURL('index.html');
      Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().tabs.create({
        url: url
      });
    }
  });
}; // utilisateur clique sur l'icon de l'extension


Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().browserAction.onClicked.addListener(activeTab); // envoi d'un dispatch vers le script content lorsqu'il y a un changement d'url
// obligatoire pour les routages côté client comme avec react et vue

Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    Object(Utils_web_ext_js__WEBPACK_IMPORTED_MODULE_0__["default"])().tabs.sendMessage(tabId, {
      action: 'SETTINGS_UPDATE'
    }).then(function () {})["catch"](function () {});
  }
});

/***/ }),

/***/ "./src/utils/web-ext.js":
/*!******************************!*\
  !*** ./src/utils/web-ext.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Env */ "./.env.js");
/* harmony import */ var Env__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Env__WEBPACK_IMPORTED_MODULE_0__);

/* Utiliser ce module permet d'unifier les développements pour toutes les plateformes. Il
retourne l'objet chrome pour chrome et tout les naviguateurs basé sur chromium (edge, opera,
brave...) Il retourne l'object browser pour firefox */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  if (Env__WEBPACK_IMPORTED_MODULE_0___default.a.bro === 'firefox') return browser;else if (Env__WEBPACK_IMPORTED_MODULE_0___default.a.bro === 'chrome') return chrome;else return chrome;
});

/***/ })

/******/ });
//# sourceMappingURL=background.js.map