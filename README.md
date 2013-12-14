mongoose-jsonform [![Build Status](https://travis-ci.org/jupe/mongoose-jsonform.png?branch=master)](https://travis-ci.org/jupe/mongoose-jsonform)
=======

Description

This mongoose-schema plugin purpose is to generate [jsonform](https://github.com/joshfire/jsonform) supported json schema. 
* jscoverage: [100%](http://jupe.github.com/mongoose-jsonform/test/coverage.html)


## Install
Install via [npm](https://npmjs.org/package/mongoose-jsonform)
```bash
$ npm install mongoose-jsonform
```

## Changeslog
* 0.0.4 Several fixes to mongoose-jsonform lib + added testcoverage-mocha tests
* 0.0.3 Documentation updates
* 0.0.2 Fixed pacakage.json and update readme
* 0.0.1 First template-release

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
