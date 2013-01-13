$(document).ready(function() {

  var h = Handlebars.helpers
  var defaultContext = {}
  var fnCalled, inverseCalled, context
  var fn = function(c){
    context = c
    fnCalled++
  }
  var inverse = function(c){
    context = c
    inverseCalled++
  }
  var opts = {fn: fn, inverse: inverse}

  function callHelper(name){
    var args = Array.prototype.splice.call(arguments,1).concat(opts)
    Handlebars.helpers[name].apply(defaultContext, args)
  }


  module("#if", {
    setup: function(){
      fnCalled = 0
      inverseCalled = 0
      context = defaultContext
    },
    teardown: function(){
      fnCalled = 0
      inverseCalled = 0
      context = defaultContext
    }
  })

  test("No Condition", 5, function() {
    callHelper('if', true)
    equal(fnCalled, 1)
    equal(inverseCalled, 0)

    callHelper('if', false)
    equal(fnCalled, 1)
    equal(inverseCalled, 1)

    equal(context, defaultContext)
  })

  test("No Condition - Context Swtich", 6, function() {

    callHelper('if', true, 'do', {foo: 'true'})
    equal(fnCalled, 1)
    equal(inverseCalled, 0)
    equal(context.foo, 'true')

    callHelper('if', false, 'do', {foo: 'false'})
    equal(fnCalled, 1)
    equal(inverseCalled, 1)
    equal(context.foo, 'false')

  })


})