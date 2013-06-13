(function(Handlebars){

  // {{#each things 'where' 'prop' '<' foo}}

  Handlebars.registerHelper('each', function(context) {
    var j4 = Handlebars.Utils.j4
    var args = Array.prototype.slice.call(arguments)
    var options = args.pop()
    args = j4.conditionArgs(args)
    var fn = options.fn, inverse = options.inverse
    var i = 0, ret = "", data, match

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if(context instanceof Array){
        for(var j = context.length; i<j; i++) {
          if (j4.conditionOK(context[i], args.verb, args.condition)) {
            match = true
            if (data) data.index = i
            ret = ret + fn(context[i], { data: data })
          }
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key) && j4.conditionOK(context[key], args.verb, args.condition)) {
            match = true
            if (data) data.key = key
            ret = ret + fn(context[key], {data: data})
            i++
          }
        }
      }
    }

    if (!match) ret = inverse(this)

    return ret
  })

})(Handlebars)