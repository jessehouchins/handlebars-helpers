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
  */

(function(Handlebars){

  function ok(prop, verb, condition){
    var index = ([].concat(condition)).indexOf(prop)
    switch (verb) {
      case 'in':        return ~index
      case 'not in':    return !~index
      case '==':        return prop == condition
      case '===':       return prop === condition
      case '!=':        return prop != condition
      case '!==':       return prop !== condition
      case '<':         return prop < condition
      case '>':         return prop > condition
      default:          return prop && !Handlebars.Utils.isEmpty(prop)
    }
  }

  Handlebars.registerHelper('if', function(prop) {

    if (typeof prop === "function") { prop = prop.call(this) }

    // Set argument variables
    var args = Array.prototype.slice.call(arguments,1)
    var scopeIndex = args.indexOf(/^do|DO$/) + 1
    var scope = scopeIndex? args[scopeIndex] || this
    var verb = args.length > 1 ? args[0] : null
    var condition = args.length > 2 ? args[1] : null
    var options = args[args.length - 1]

    if (ok(prop, verb, condition)){
      return options.fn(scope)
    } else {
      return options.inverse(scope)
    }
  })

})(Handlebars)
