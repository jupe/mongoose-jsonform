mongoose-jsonform [![Build Status](https://travis-ci.org/jupe/mongoose-jsonform.png?branch=master)](https://travis-ci.org/jupe/mongoose-jsonform)
=======

[![NPM](https://nodei.co/npm/mongoose-jsonform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mongoose-jsonform/)

[![NPM](https://nodei.co/npm-dl/mongoose-jsonform.png)](https://nodei.co/npm/csv-json/)

[jscov: 93%](http://htmlpreview.github.io/?https://github.com/jupe/mongoose-jsonform/blob/master/test/coverage.html)


This mongoose (schema) plugin purpose is to generate [jsonform](https://github.com/joshfire/jsonform) supported schemas. 


## Install
Install via [npm](https://npmjs.org/package/mongoose-jsonform)
```bash
$ npm install mongoose-jsonform
```

## Changeslog
|---------|-------|
|0.1.0|use lodash instead of underscore. Test against node 4.2 in CI|
|0.0.9|Fixed nested path bug (issue #1)|
|0.0.8|Fixed DocumentArray and SchemaArray bug and added example express app|
|0.0.7|added default value option from document (optional)|
|0.0.6|added min,max and include/exclude paths support for number type and update usage example|
|0.0.5|Update files related to test coverage|
|0.0.4|Several fixes to mongoose-jsonform lib + added testcoverage-mocha tests|
|0.0.3|Documentation updates|
|0.0.2|Fixed pacakage.json and update readme|
|0.0.1|First template-release|

## Optional mongoose-schema parameters for jsonform
Check from here: [jsonform-common schema properties](https://github.com/joshfire/jsonform/wiki#wiki-default-common)

## Limitations

### Not supported schema types

* Mixed
 * is not unambiguous
* Buffer
 * What kind of form this Buffer should be? If you have idea, please let me know.
  * Maybe File?
* integer  (jsonform support, but mongoose not)

## Usage

```js
var jsonform = require('mongoose-jsonform');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:  {type: String, required: true,
    //These keys are just for jsonform. Mongoose not support these keys. 
    title: 'Blog title',
    description: 'Title for a Blog',
    maxLength: 100
  },
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
BlogSchema.plugin( jsonform, {
  excludedPaths: ['_id', '__v'] //these paths are generally exceluded
} );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog({author: 'me'});
var out = doc.jsonform({
  includes: ['title', 'body', 'author'] //only these paths are included in json schema
  //excludes:['_id', '__v'], //alternative we could set excluded paths
});
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
