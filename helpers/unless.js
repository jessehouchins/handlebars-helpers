/*!
  * unless.js - Drop in replacement for Handlebars default `#unless` for use with `#if` (with conditionals)
  * https://github.com/jessehouchins/handlebars-helpers
  * copyright Jesse Houchins
  * MIT License
  *
  * Note: The only change here is using `if.apply` instead of `if.call`... why this isn't the default is beyond me.
  */

(function(Handlebars){

  Handlebars.registerHelper('unless', function(context, options) {
    var fn = options.fn, inverse = options.inverse
    options.fn = inverse
    options.inverse = fn

    return Handlebars.helpers['if'].apply(this, arguments)
  })

})(Handlebars)
