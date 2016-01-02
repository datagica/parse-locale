class ParseLocale {
  constructor(opts = {}) {
    this.opts = opts;
    this.cache = [];
    this.languages = opts.languages || {};
  }

  detectAny(countryCode, txt, words) {
    let pattern;
    if (typeof this.cache[countryCode] !== 'undefined') {
      pattern = this.cache[countryCode];
    } else {
      const words_str = "(" + words.map(x => x.trim().toLowerCase()).join("|") + ")";
      pattern = new RegExp(words_str, 'gi');
      this.cache[countryCode] = pattern;
    }
    //console.log("pattern for doc lang: "+pattern);
    return (txt.match(pattern) || []).length;
  }

  load(languages) {
    this.languages = languages;
    return this;
  }

  parse(input, opts = {}) {

    let text = ""
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      throw new Error(`input is not text but ${typeof input}`)
    }

    return Promise.resolve(
      Object.keys(this.languages).reduce((detected, lang) => {
        const score = this.detectAny(lang, text, this.languages[lang]);
        //console.log("score: " + score);
        if (score > detected.score) {
          return {
            lang: lang,
            score: score
          }
        } else {
          return detected;
        }
      }, {
        lang: 'unknow',
        score: 0
      }).lang
    )
  }
}

const singletonInstance = new ParseLocale({})
const singletonMethod = function(input, opts) {
  return singletonInstance.parse(input, opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseLocale = singletonInstance
module.exports.ParseLocale = ParseLocale
