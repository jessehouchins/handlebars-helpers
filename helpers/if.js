/*!
  * if.js - Drop in replacement for Handlebars default `#if` with basic conditionals
  * https://github.com/jessehouchins/handlebars-helpers
  * copyright Jesse Houchins
  * MIT License
  *
  * Usage
  * -----------
  *
  * 1. standard if:         {{#if prop}}
  * 2. conditional:         {{#if prop 'verb' condition}}
  * 3. mathcing:            {{#if prop 'in' ['foo','bar']}}
  * 4. context switching:   {{#if prop 'do' newContext}}
  *                         {{#if prop 'verb' condition 'do' newContext}}
  * 5. Collections:         {{#if 'any' collection 'prop' 'verb' condition 'do' newContext (options)}}
  */

(function(Handlebars){

  Handlebars.registerHelper('if', function() {
    var j4 = Handlebars.Utils.j4
    var args = Array.prototype.slice.call(arguments)
    var options = args.pop()
    var scope = j4.scope(this, args)

    if (j4.ifOK(args)){
      return options.fn(scope)
    } else {
      return options.inverse(scope)
    }
  })

})(Handlebars)
