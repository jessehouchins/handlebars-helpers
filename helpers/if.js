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
  * 5. Collections:         {{#if 'any' collection 'prop' 'verb' condition}}
  */

(function(Handlebars){

  function ok(prop, verb, condition, check){
    var index = ([].concat(condition)).indexOf(prop)
    switch (verb) {
      case 'in':        return ~index
      case 'not in':    return !~index
      case '==':        return prop == condition
      case '===':       return prop === condition
      case '!=':        return prop != condition
      case '!==':       return prop !== condition
      case '<':         return prop < condition
      case '<=':        return prop <= condition
      case '>':         return prop > condition
      case '>=':        return prop >= condition
      default:          return prop && !Handlebars.Utils.isEmpty(prop)
    }
  }

  function getProp(args){
    var prop = args[(args[1] instanceof Array) ? 1 : 0]
    if (typeof prop === "function") prop = prop.call(this)
    return [].concat(prop)
  }

  function getVerb(args){
    if (args[1] instanceof Array) return args.length > 3 ? args[2] : null
    return args.length > 2 ? args[1] : null
  }

  function getCondition(args){
    if (args[1] instanceof Array) return args.length > 4 ? args[3] : null
    return args.length > 3 ? args[2] : null
  }

  function check(args){
    var prop = getProp.call(this, args)
    var verb = getVerb(args)
    var condition = getCondition(args)
    var matches = 0
    var type = (args[1] instanceof Array) ? args[0] : 'all'

    // Check for any, all, or no mathces
    for (var i = 0; i < prop.length; i++){
      if (ok(prop[i], verb, condition)) matches++
      if (type === 'all' && i === matches) return false // all
      else if (type === 'any' && matches > 0) return true // any
    }
    return type === 'all' || type === 'no' && !matches

  }

  Handlebars.registerHelper('if', function() {

    var args = Array.prototype.slice.call(arguments)
    var options = args[args.length - 1]
    var scopeIndex = args.indexOf('do') + 1 || args.indexOf('DO') + 1
    var scope = scopeIndex ? args[scopeIndex] : this

    if (check(args)){
      return options.fn(scope)
    } else {
      return options.inverse(scope)
    }
  })

})(Handlebars)
