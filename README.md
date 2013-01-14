handlebars-helpers
==================

A collection of helpers for Handlebars. Current helpers:

1. #if - with support for conditionals
2. #unless - with support for conditionals (requires #if)


\#if
----------

This is a drop-in replacement for Handlebars default ```#if``` with added support for Array checking, context switching, and the following conditionals:
- ```in``` - Check for the presence of an item in the given list.
- ```not in``` - Inverse of ```in```
- and these standard operators ```==```, ```===```, ```!=```, ```!==```, ```<```, ```<=```, ```>```, ```>=```.

### Basic Property Check
This is the default handlebars behavior.
```
{{#if property}}
  ...
{{else}}
  ...
{{/if}}
```

### Conditionals
```
{{#if property '===' condition}}
  ...
{{else}}
  ...
{{/if}}

{{#if property 'in' [1,2,5]}}
  ...
{{else}}
  ...
{{/if}}
```

### Array Checks
Use keywords ```all``` (default), ```any```, and ```no``` for checking items in an array seperately. Optionally include a ```propName``` to evaluate collections based on their properties.
```
{{#if 'any' things '>' 5}}
  ...
{{else}}
  ...
{{/if}}

{{#if 'all' things 'foo' '>' 5}}
  ...
{{else}}
  ...
{{/if}}
```

### Context Switching
You may also include a ```do``` operator to evaluate the block with a different context.
```
{{#if property 'do' newContext}}
  ...
{{else}}
  ...
{{/if}}

{{#if property '==' 5 'do' newContext}}
  ...
{{else}}
  ...
{{/if}}
```