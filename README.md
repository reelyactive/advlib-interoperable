advlib-interoperable
====================

Interpreter of [InteroperaBLE identifiers](https://reelyactive.github.io/interoperable-identifier/).  __advlib-interoperable__ can be used standalone or, more commonly, as an interpreter module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib) library.


Installation
------------

    npm install advlib-interoperable


Hello advlib-interoperable!
---------------------------

```javascript
const interpreter = require('advlib-interoperable');

let packet = {
    deviceIds: [ "496f49445554462d3332/00000001f989" ]
};
interpreter.interpret(packet);

console.log(packet);
```

Which should yield the following console output:

    { deviceIds: [ "496f49445554462d3332/00000001f989" ],
      unicodeCodePoints: [ 129417 ] }


Supported Entity UUIDs (non-URI)
--------------------------------

__advlib-interoperable__ supports the following Entity UUIDs which have [specific interpretations](https://reelyactive.github.io/interoperable-identifier/#part02) _other_ than conversion to a URI:

| Entity UUID                            | Interpretation     |
|:---------------------------------------|:-------------------|
| 496f4944_-434f-4445-b73e-_5554462d3332 | Unicode Code Point |
| 496f4944_-434f-4445-b73e-_427574746f6e | Button             |
| 496f4944-434f-4445-b73e-425553616665   | BlueUp Safety      |

Entity UUIDs with _italics_ additionally support an alternative 80-bit elided UUID representation, where the 48-bits in _italics_ are removed.


License
-------

MIT License

Copyright (c) 2021 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.