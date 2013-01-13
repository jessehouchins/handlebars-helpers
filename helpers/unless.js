/*!
  * unless.js - Drop in replacement for Handlebars default `#unless` for use with `#if` (with conditionals)
  * https://github.com/jessehouchins/handlebars-helpers
  * copyright Jesse Houchins
  * MIT License
  */

(function(Handlebars){

  Handlebars.registerHelper('unless', function(context) {
    var args = arguments
    var options = args[args.length - 1]
    var fn = options.fn, inverse = options.inverse
    options.fn = inverse
    options.inverse = fn

    return Handlebars.helpers['if'].apply(this, args)
  })

})(Handlebars)
