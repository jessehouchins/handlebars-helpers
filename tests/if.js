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

  test("Unknown Verb", 2, function(){
    x.call('if', true, 'foo', false);     equal(x.fnCalled, 1, 'if block rendered when prop == true and unknow verb provided')
    x.call('if', false, 'foo', false);    equal(x.fnCalled, 1, 'else block rendered when prop == false and unknow verb provided')
  })

  test("in", 2, function(){
    x.call('if', 7, 'in', [4,5,6,7]);     equal(x.fnCalled, 1, 'if block rendered when prop in list')
    x.call('if', 2, 'in', [4,5,6,7]);     equal(x.inverseCalled, 1, 'else block rendered when prop not in list')
  })

  test("not in", 2, function(){
    x.call('if', 2, 'not in', [4,5,6,7]);     equal(x.fnCalled, 1, 'if block rendered when prop not in list')
    x.call('if', 4, 'not in', [4,5,6,7]);     equal(x.inverseCalled, 1, 'else block rendered when prop in list')
  })

  test("==", 2, function(){
    x.call('if', 7, '==', '7');   equal(x.fnCalled, 1, 'if block rendered when prop == condition')
    x.call('if', 7, '==', 8);     equal(x.inverseCalled, 1, 'else block rendered when prop != condition')
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

  test("any", 2, function(){
    x.call('if', 'any', [2,3,4], '==', 4);    equal(x.fnCalled, 1, 'if block rendered when any prop == condition')
    x.call('if', 'any', [2,3,5], '==', 4);    equal(x.inverseCalled, 1, 'else block rendered when no prop == condition')
  })

  test("all", 2, function(){
    x.call('if', 'all', [4,4,4], '==', 4);    equal(x.fnCalled, 1, 'if block rendered when any prop == condition')
    x.call('if', 'all', [2,3,5], '==', 4);    equal(x.inverseCalled, 1, 'else block rendered when not all props == condition')
  })

  test("no", 2, function(){
    x.call('if', 'no', [2,3,5], '==', 4);     equal(x.fnCalled, 1, 'if block rendered when no prop == condition')
    x.call('if', 'no', [2,3,4], '==', 4);     equal(x.inverseCalled, 1, 'else block rendered when at least one prop == condition')
  })

})