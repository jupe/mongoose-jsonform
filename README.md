mongoose-jsonform [![Build Status](https://secure.travis-ci.org/fengmk2/mongoose-jsonform.png)](http://travis-ci.org/fengmk2/mongoose-jsonform) [![Coverage Status](https://coveralls.io/repos/fengmk2/mongoose-jsonform/badge.png)](https://coveralls.io/r/fengmk2/mongoose-jsonform)
=======

![logo](https://raw.github.com/jussiva/mongoose-jsonform/master/logo.png)

Description

This mongoose-schema plugin purpose is to generate jsonform supported json schema. 
* jscoverage: [100%](http://jussiva.github.com/coverage/mongoose-jsonform.html)


## Install

```bash
$ npm install mongoose-jsonform
```

## Usage

```js
var mongoose-jsonform = require('mongoose-jsonform');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:  {type: String, require: true, title: 'X', tooltip: 'x'},
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
BlogSchema.plugin( module.exports, {} );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog();
var out = doc.jsonform({excludes:['_id']});
console.log( JSON.stringify(out, null, '  ') );
```

## License 

(The MIT License)

Copyright (c) 2013 jussiva &lt;jussiva@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
