$(document).ready(function(x) {

  var x = Handlebars.MyCustomTestHelper

  module("#unless", x.lifecycle)

  test("Default", 2, function(){
    x.call('unless', false);     equal(x.fnCalled, 1, 'unless block rendered when prop is false')
    x.call('unless', true);    equal(x.inverseCalled, 1, 'else block rendered when prop is true')
  })

  test("Context Swtich", 2, function(){
    x.call('unless', false);                       equal(x.context, x.defaultContext, 'block rendered with original context when none provided')
    x.call('unless', false, 'do', {prop: 'a'});    equal(x.context.prop, 'a', 'block rendered with new context when provided')
  })

  test("Condition", 2, function(){
    x.call('unless', 1, '==', 1);                       equal(x.context, x.defaultContext, 'block rendered with original context when none provided')
    x.call('unless', 1, '==', 1, 'do', {prop: 'b'});    equal(x.context.prop, 'b', 'block rendered with new context when provided')
  })

  test("Unknown Verb", 2, function(){
    x.call('unless', false, 'foo', true);     equal(x.fnCalled, 1, 'unless block rendered when prop == false and unknow verb provided')
    x.call('unless', true, 'foo', true);      equal(x.fnCalled, 1, 'else block rendered when prop == true and unknow verb provided')
  })

})