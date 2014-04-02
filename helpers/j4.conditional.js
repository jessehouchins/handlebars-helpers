/*!
  * 8D-conditional.js - Helper utilitiy for 8D helpers
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
  * 5. Pseudo Collections:  {{#if 'all' object1 object2 'prop' 'verb' condition}}
  * 5. Multiple Contexts:   {{#if 'no' foo bar 'verb' condition}}
  */

(function(Handlebars){

  Handlebars.Utils.j4 = {

    verbRx: /^(in|not in|is|is a|is an|==|===|!=|!==|<|<=|>|>=|matches)$/,
    arrayChecks: ['any','all','no'],

    scope: function(originalScope, args){
      var scopeIndex = args.indexOf('do') + 1 || args.indexOf('DO') + 1
      return scopeIndex ? args[scopeIndex] : originalScope
    },

    verbIndex: function(args) {
      for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'string' && args[i].match(this.verbRx)) return i
      }
    },

    realTypeof: function(x){
      return typeof x === 'object' ? Object.prototype.toString.call(x).replace(/^\[object |\]$/g,'').toLowerCase() : typeof x
    },

    conditionOK: function(prop, verb, condition){
      var index = ([].concat(condition)).indexOf(prop)

      switch (verb) {
        case '==':        return prop == condition
        case '===':       return prop === condition
        case '!=':        return prop != condition
        case '!==':       return prop !== condition
        case '<':         return prop < condition
        case '<=':        return prop <= condition
        case '>':         return prop > condition
        case '>=':        return prop >= condition
        case 'in':        return ~index
        case 'not in':    return !~index
        case 'is':
        case 'is a':
        case 'is an':     return this.realTypeof(prop) === condition
        case 'matches':   return this.realTypeof(condition) === 'regexp' && condition.test(prop)
        default:          return prop && !Handlebars.Utils.isEmpty(prop)
      }
    },

    conditionArgs: function(args){
      var result = {}

      // Find the verb and condition
      var verbIndex = this.verbIndex(args)
      var conditionIndex = verbIndex+1
      var propIndex = verbIndex-1
      var contextStart= 0
      var contextEnd = verbIndex


      // Determine the type of check (any, all, no)
      var checkMultiple = this.arrayChecks.indexOf(args[0]) !== -1
      if (checkMultiple) contextStart++

      // Find the context - 0any 1context 2prop 3verb
      var context

      // Find the prop for check multiple cases
      var propName = checkMultiple && typeof args[verbIndex-1] === 'string' && typeof args[verbIndex-2] !== 'string' && args[verbIndex-1]
      if (propName) contextEnd--

      // Handle multiple context args
      if (checkMultiple && contextEnd - contextStart > 1) {
        context = args.slice(contextStart, contextEnd)
      }

      // Make sure context is an array
      else {
        context = args[contextStart]
        if (typeof context === "function") context = context.call(this)
        context = [].concat(context)
      }

      result.type = checkMultiple && args[0] || 'all'
      result.context = context
      result.verb = args[verbIndex]
      result.condition = args[conditionIndex]
      result.propName = propName

      return result
    },

    ifOK: function(args){
      args = this.conditionArgs(args)
      var propName = args.propName
      var context = args.context
      var all = args.type === 'all'
      var any = args.type === 'any'

      // Check for any, all, or no mathces the hard way
      if (all && !context.length) return
      for (var i = 0, matches = 0; i < context.length; i++){
        var prop = context[i]
        if (propName && prop.hasOwnProperty && prop.hasOwnProperty(propName)) prop = prop[propName]
        if (this.conditionOK(prop, args.verb, args.condition)) matches++
        if (all && i === matches) return false // all
        else if (any && matches > 0) return true // any
      }
      return all || !any && !matches
    }

  }

})(Handlebars)
