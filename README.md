advlib-interoperable
====================

Interpreter of [InteroperaBLE identifiers](https://reelyactive.github.io/diy/best-practices-ble-identifiers/#part04) for [advlib](https://github.com/reelyactive/advlib).


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