var TEST_HELPER = {

  defaultContext: {},
  fnCalled: 0,
  inverseCalled: 0,
  context: {},

  lifecycle: {
    setup: function(){
      TEST_HELPER.fnCalled = 0
      TEST_HELPER.inverseCalled = 0
      TEST_HELPER.context = TEST_HELPER.defaultContext
    },
    teardown: function(){
      TEST_HELPER.fnCalled = 0
      TEST_HELPER.inverseCalled = 0
      TEST_HELPER.context = TEST_HELPER.defaultContext
    }
  },

  call: function(name){
    var opts = {
      fn: function(c){
        TEST_HELPER.context = c
        TEST_HELPER.fnCalled++
      },
      inverse: function(c){
        TEST_HELPER.context = c
        TEST_HELPER.inverseCalled++
      }
    }
    var args = Array.prototype.splice.call(arguments,1).concat(opts)
    Handlebars.helpers[name].apply(TEST_HELPER.defaultContext, args)
  }
}