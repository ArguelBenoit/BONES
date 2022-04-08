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
  bro: 'firefox'
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
/* harmony import */ var Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Utils/handlers.js */ "./src/utils/handlers.js");


var activeTab = function activeTab() {
  Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().tabs.query({
    title: 'BONES !#@$'
  }).then(function (tabs) {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      var id = tabs[0].id;
      Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().tabs.update(id, {
        active: true
      }); // sinon l'onglet n'existe pas
    } else {
      // on ouvre un onglet BONES
      var url = Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().extension.getURL('index.html');
      Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().tabs.create({
        url: url
      });
    }
  });
}; // utilisateur clique sur l'icon de l'extension


Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().browserAction.onClicked.addListener(activeTab); // envoi d'un dispatch vers le script content lorsqu'il y a un changement d'url
// obligatoire pour les routages côté client comme avec react et vue

Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    Utils_handlers_js__WEBPACK_IMPORTED_MODULE_0__["handlers"].webExt().tabs.sendMessage(tabId, {
      action: 'MAINUPDATE'
    }).then(function () {})["catch"](function () {});
  }
});

/***/ }),

/***/ "./src/utils/handlers.js":
/*!*******************************!*\
  !*** ./src/utils/handlers.js ***!
  \*******************************/
/*! exports provided: handlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlers", function() { return handlers; });
/* harmony import */ var Env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Env */ "./.env.js");
/* harmony import */ var Env__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Env__WEBPACK_IMPORTED_MODULE_0__);

var handlers = {
  /* retourne un uuid */
  uuid: function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },

  /* retourne une date mm-dd-yyyy */
  date: function date() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Janvier = 0

    var year = today.getFullYear();
    return "".concat(month, "-").concat(day, "-").concat(year);
  },

  /* retourne un booléen qui valide l'activation de bones */
  getActivate: function getActivate(settings) {
    if (settings.activate === true && settings.friends.length > 0 && settings.pair !== '') {
      return true;
    } else {
      return false;
    }
  },

  /* Utiliser ce module permet d'unifier les développements pour toutes les plateformes. Il
  retourne l'objet chrome pour chrome et tout les naviguateurs basé sur chromium (edge, opera,
  brave...) Il retourne l'object browser pour firefox */
  webExt: function webExt() {
    if (Env__WEBPACK_IMPORTED_MODULE_0___default.a.bro === 'firefox') {
      return browser;
    } else if (Env__WEBPACK_IMPORTED_MODULE_0___default.a.bro === 'chrome') {
      return chrome;
    } else {
      return chrome;
    }
  }
};

/***/ })

/******/ });
//# sourceMappingURL=background.js.map