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
      case '<=':        return prop <= condition
      case '>':         return prop > condition
      case '>=':        return prop >= condition
      default:          return prop && !Handlebars.Utils.isEmpty(prop)
    }
  }

  function check(args){

    // Decide if we are checking a single item, or a list
    var numArgs = args.length
    var evenArgs = !(numArgs%2)
    var checkMultiple = args[1] instanceof Array
    var type = checkMultiple && args[0] || 'all'

    // Context
    var context = args[checkMultiple ? 1 : 0]
    if (typeof context === "function") context = context.call(this)
    context = [].concat(context)

    // Prop Name (for any, all, no)
    var propName
    if (checkMultiple && evenArgs) propName = args[2]

    // Condition
    var condition, conditionIndex
    if (checkMultiple && numArgs > 4) conditionIndex = evenArgs ? 4 : 3
    else if (!checkMultiple && numArgs > 3) conditionIndex = 2
    if (conditionIndex) condition = args[conditionIndex]

    // Verb
    var verb = args[conditionIndex - 1]

    // Check for any, all, or no mathces the hard way
    for (var i = 0, matches = 0; i < context.length; i++){
      var prop = propName && context[i][propName] || context[i]
      if (ok(prop, verb, condition)) matches++
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
