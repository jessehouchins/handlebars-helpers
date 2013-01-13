$(document).ready(function(x){

  var x = TEST_HELPER

  module("#if", x.lifecycle)

  test("Default", 2, function(){
    x.call('if', true);     equal(x.fnCalled, 1, 'if block rendered when prop is true')
    x.call('if', false);    equal(x.inverseCalled, 1, 'else block rendered when prop is false')
  })

  test("Context Swtich", 2, function(){
    x.call('if', true);                       equal(x.context, x.defaultContext, 'block rendered with original context when none provided')
    x.call('if', true, 'do', {prop: 'a'});    equal(x.context.prop, 'a', 'block rendered with new context when provided')
  })

  test("Condition", 2, function(){
    x.call('if', 1, '==', 1);                       equal(x.context, x.defaultContext, 'block rendered with original context when none provided')
    x.call('if', 1, '==', 1, 'do', {prop: 'b'});    equal(x.context.prop, 'b', 'block rendered with new context when provided')
  })

  test("==", 2, function(){
    x.call('if', 7, '==', '7');   equal(x.fnCalled, 1, 'if block rendered when prop == condition')
    x.call('if', 7, '==', 8);     equal(x.inverseCalled, 1, 'else block rendered when prop != condition')
  })

  test("===", 2, function(){
    x.call('if', 7, '===', 7);    equal(x.fnCalled, 1, 'if block rendered when prop === condition')
    x.call('if', 7, '===', '7');  equal(x.inverseCalled, 1, 'else block rendered when prop !== condition')
  })

  test("!=", 2, function(){
    x.call('if', 7, '!=', 8);     equal(x.fnCalled, 1, 'if block rendered when prop != condition')
    x.call('if', 7, '!=', '7');   equal(x.inverseCalled, 1, 'else block rendered when prop == condition')
  })

  test("!==", 2, function(){
    x.call('if', 7, '!==', '7');  equal(x.fnCalled, 1, 'if block rendered when prop !== condition')
    x.call('if', 7, '!==', 7);    equal(x.inverseCalled, 1, 'else block rendered when prop === condition')
  })

  test(">", 5, function(){
    x.call('if', 8, '>', 7);              equal(x.fnCalled, 1, 'if block rendered when prop > condition')
    x.call('if', 8, '>', 8);              equal(x.inverseCalled, 1, 'else block rendered when prop == condition')
    x.call('if', 8, '>', 9);              equal(x.inverseCalled, 2, 'else block rendered when prop < condition')
    x.call('if', undefined, '>', 8);      equal(x.inverseCalled, 3, 'else block rendered when prop is undefined')
    x.call('if', 8, '>', undefined);      equal(x.inverseCalled, 4, 'else block rendered when condition is undefined')
  })

  test(">=", 5, function(){
    x.call('if', 8, '>=', 7);             equal(x.fnCalled, 1, 'if block rendered when prop > condition')
    x.call('if', 8, '>=', 8);             equal(x.fnCalled, 2, 'if block rendered when prop == condition')
    x.call('if', 8, '>=', 9);             equal(x.inverseCalled, 1, 'else block rendered when prop < condition')
    x.call('if', undefined, '>=', 8);     equal(x.inverseCalled, 2, 'else block rendered when prop is undefined')
    x.call('if', 8, '>=', undefined);     equal(x.inverseCalled, 3, 'else block rendered when condition is undefined')
  })

  test("<", 5, function(){
    x.call('if', 2, '<', 4);              equal(x.fnCalled, 1, 'if block rendered when prop < condition')
    x.call('if', 2, '<', 2);              equal(x.inverseCalled, 1, 'else block rendered when prop == condition')
    x.call('if', 2, '<', 1);              equal(x.inverseCalled, 2, 'else block rendered when prop > condition')
    x.call('if', undefined, '<', 2);      equal(x.inverseCalled, 3, 'else block rendered when prop is undefined')
    x.call('if', 2, '<', undefined);      equal(x.inverseCalled, 4, 'else block rendered when condition is undefined')
  })

  test("<=", 5, function(){
    x.call('if', 2, '<=', 4);             equal(x.fnCalled, 1, 'if block rendered when prop < condition')
    x.call('if', 2, '<=', 2);             equal(x.fnCalled, 2, 'if block rendered when prop == condition')
    x.call('if', 2, '<=', 1);             equal(x.inverseCalled, 1, 'else block rendered when prop > condition')
    x.call('if', undefined, '<=', 2);     equal(x.inverseCalled, 2, 'else block rendered when prop is undefined')
    x.call('if', 2, '<=', undefined);     equal(x.inverseCalled, 3, 'else block rendered when condition is undefined')
  })

})