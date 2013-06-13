$(document).ready(function(x) {

  var x = Handlebars.MyCustomTestHelper

  module("#unless", x.lifecycle)

  test("Default", 4, function(){
    x.call('each', [1,2,3]);                    equal(x.fnCalled, 3, 'each block rendered once for each item in Array')
    x.call('each', x.obj({a:1,b:2},{x:9}));     equal(x.fnCalled, 5, 'each block rendered once for each item in Object')
    x.call('each', []);                         equal(x.inverseCalled, 1, 'else block rendered when no items in Array')
    x.call('each', x.obj({},{x:9}));            equal(x.inverseCalled, 2, 'else block rendered when no hasOwnProperty items in Object')
  })

  test("Conditionals", 3, function(){
    x.call('each', [1,2,3], '<', 8);              equal(x.fnCalled, 3, 'each block rendered three times, once for each passing item')
    x.call('each', [1,2,3], '<', 3);              equal(x.fnCalled, 5, 'each block rendered twice, once for each passing item')
    x.call('each', [1,2,3], '>', 3);              equal(x.inverseCalled, 1, 'else block rendered once if all items fail')
  })

})