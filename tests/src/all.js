const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

import { ParseLocale } from '../../lib/parse-locale';

describe('@datagica/parse-locale', () => {

  describe('detecting locale of a simple text', () => {

    // we create a basic dataset and test
    const languages = {
      "fr": [
        "pied",
        "aime",
        "regarder",
        "la",
        "le",
        "télé"
      ],
      "en": [
        "foot",
        "like",
        "watch",
        "the",
        "tv"
      ]
    };

    const parseLocale = new ParseLocale({
      languages: languages
    });

    it('should detect french (fr)', done => {
      const tests = [{
        input: "j'aime le foot et regarder la tv",
        output: 'fr'
      }];


      Promise.all(tests.map(test => {
        return parseLocale.parse(test.input).then(output => {
          expect(output).to.be.like(test.output);
          return Promise.resolve(true);
        })
      })).then(ended => {
        console.log(`test ended`);
        done();
        return true;
      }).catch(exc => {
        console.error(exc);
      })
    });

    it('should detect english (en)', done => {
      const tests = [{
        input: "I like soccer and watching tv",
        output: 'en'
      }];
      Promise.all(tests.map(test => {
        return parseLocale.parse(test.input).then(output => {
          expect(output).to.be.like(test.output);
          return Promise.resolve(true);
        })
      })).then(ended => {
        console.log(`test ended`);
        done();
        return true;
      }).catch(exc => {
        console.error(exc);
      })
    });

  });
});
