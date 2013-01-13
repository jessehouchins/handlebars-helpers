$(document).ready(function(x) {

  var x = TEST_HELPER

  module("#unless", x.lifecycle)

  test("No Condition", 5, function() {
    x.call('unless', false)
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 0)

    x.call('unless', true)
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 1)

    equal(x.context, x.defaultContext)
  })

  test("No Condition - Context Swtich", 6, function() {
    x.call('unless', false, 'do', {prop: 'a'})
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 0)
    equal(x.context.prop, 'a')

    x.call('unless', true, 'do', {prop: 'b'})
    equal(x.fnCalled, 1)
    equal(x.inverseCalled, 1)
    equal(x.context.prop, 'b')
  })

})