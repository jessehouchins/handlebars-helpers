(function(Handlebars){

var x = Handlebars.MyCustomTestHelper = {

  defaultContext: {},
  fnCalled: 0,
  inverseCalled: 0,
  context: {},

  lifecycle: {
    setup: function(){
      x.fnCalled = 0
      x.inverseCalled = 0
      x.context = x.defaultContext
    },
    teardown: function(){
      x.fnCalled = 0
      x.inverseCalled = 0
      x.context = x.defaultContext
    }
  },

  call: function(name){
    var opts = {
      fn: function(c){
        x.context = c
        x.fnCalled++
      },
      inverse: function(c){
        x.context = c
        x.inverseCalled++
      }
    }
    var args = Array.prototype.splice.call(arguments,1).concat(opts)
    Handlebars.helpers[name].apply(x.defaultContext, args)
  },

  obj: function(props, proto){
    var Obj = function(props){
      for (var key in props) {
        this[key] = props[key]
      }
    }
    Obj.prototype = proto
    return new Obj(props)
  }
}

})(Handlebars)