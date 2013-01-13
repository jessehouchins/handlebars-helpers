$(document).ready(function(x) {

  var x = TEST_HELPER

  module("#if", x.lifecycle)

  test("No Condition", 5, function() {
    x.call('if', true)
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 0)

    x.call('if', false)
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 1)

    equal(x.context, x.defaultContext)
  })

  test("No Condition - Context Swtich", 6, function() {
    x.call('if', true, 'do', {prop: 'a'})
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 0)
    equal(x.context.prop, 'a')

    x.call('if', false, 'do', {prop: 'b'})
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 1)
    equal(x.context.prop, 'b')
  })

})