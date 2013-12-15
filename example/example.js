var jsonform = require('../');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:  {type: String, require: true, title: 'Title', description: 'Blog Title'},
  author: {type: String, title: 'Author'},
  body:   {type: String, title: 'Body'},
  keywords: [{type: String, title: 'Keyword'}],
  comments: [{ 
    body: {type: String, title: 'Body'},
    date: {type: Date, title: 'Date'} }],
  date: { type: Date, default: Date.now, title: 'Date' },
  hidden: {type: Boolean, title: 'Hidden'},
  meta: {
    votes: {type: Number, title: 'Votes'},
    favs:  {type: Number, title: 'Favorites'},
  }
});
BlogSchema.plugin( jsonform, {} );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog({author: 'me', hidden: false});
module.exports = doc;
var out = doc.jsonform({excludes:['_id']});
console.log( JSON.stringify(out, null, '  ') );