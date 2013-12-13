var jsonform = require('../');
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
BlogSchema.plugin( jsonform, {} );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog();
var out = doc.jsonform({excludes:['_id']});
console.log( JSON.stringify(out, null, '  ') );




//var blog = new blogSchema();
//console.log( Blog.jsonform() );
