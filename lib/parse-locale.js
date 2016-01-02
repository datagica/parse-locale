"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParseLocale = (function () {
  function ParseLocale() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ParseLocale);

    this.opts = opts;
    this.cache = [];
    this.languages = opts.languages || {};
  }

  (0, _createClass3.default)(ParseLocale, [{
    key: "detectAny",
    value: function detectAny(countryCode, txt, words) {
      var pattern = undefined;
      if (typeof this.cache[countryCode] !== 'undefined') {
        pattern = this.cache[countryCode];
      } else {
        var words_str = "(" + words.map(function (x) {
          return x.trim().toLowerCase();
        }).join("|") + ")";
        pattern = new RegExp(words_str, 'gi');
        this.cache[countryCode] = pattern;
      }
      //console.log("pattern for doc lang: "+pattern);
      return (txt.match(pattern) || []).length;
    }
  }, {
    key: "load",
    value: function load(languages) {
      this.languages = languages;
      return this;
    }
  }, {
    key: "parse",
    value: function parse(input) {
      var _this = this;

      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var text = "";
      if (typeof input === 'string') {
        text = input;
      } else if (typeof input.text === 'string') {
        text = input.text;
      } else {
        throw new Error("input is not text but " + (typeof input === "undefined" ? "undefined" : (0, _typeof3.default)(input)));
      }

      return _promise2.default.resolve((0, _keys2.default)(this.languages).reduce(function (detected, lang) {
        var score = _this.detectAny(lang, text, _this.languages[lang]);
        //console.log("score: " + score);
        if (score > detected.score) {
          return {
            lang: lang,
            score: score
          };
        } else {
          return detected;
        }
      }, {
        lang: 'unknow',
        score: 0
      }).lang);
    }
  }]);
  return ParseLocale;
})();

var singletonInstance = new ParseLocale({});
var singletonMethod = function singletonMethod(input, opts) {
  return singletonInstance.parse(input, opts);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseLocale = singletonInstance;
module.exports.ParseLocale = ParseLocale;