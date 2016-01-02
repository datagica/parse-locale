'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _parseLocale = require('../../lib/parse-locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/parse-locale', function () {

  describe('detecting locale of a simple text', function () {

    // we create a basic dataset and test
    var languages = {
      "fr": ["pied", "aime", "regarder", "la", "le", "télé"],
      "en": ["foot", "like", "watch", "the", "tv"]
    };

    var parseLocale = new _parseLocale.ParseLocale({
      languages: languages
    });

    it('should detect french (fr)', function (done) {
      var tests = [{
        input: "j'aime le foot et regarder la tv",
        output: 'fr'
      }];

      _promise2.default.all(tests.map(function (test) {
        return parseLocale.parse(test.input).then(function (output) {
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });

    it('should detect english (en)', function (done) {
      var tests = [{
        input: "I like soccer and watching tv",
        output: 'en'
      }];
      _promise2.default.all(tests.map(function (test) {
        return parseLocale.parse(test.input).then(function (output) {
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });
  });
});