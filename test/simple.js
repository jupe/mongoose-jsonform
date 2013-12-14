/* mocha tests will be here.. */
var mocha = require('mocha')
  , Context = mocha.Context
  , Suite = mocha.Suite
  , Test = mocha.Test
  , Chai = require("chai")
  , assert = Chai.assert
  , expect = Chai.expect
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , jsonform = require('../');

Chai.use(require('chai-fuzzy'));
var now = new Date().getTime();

var BlogSchema = new Schema({
  title:  {type: String, require: true, title: 'X', tooltip: 'x'},
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
var BlogJsSchema = {
	title: {
		
		type: 'string',
		require: true,
		title: 'X',
		tooltip: 'x'
	},
	
	author: {type: 'string'},
	body: {type: 'string'},
	comments: {
		type: 'array',
		items: {
			body: {type: 'string'},
			date: {type: 'date'},
			_id: {type: 'string', auto: true}
		}
	},
	date: {type: 'date', default: now},
	hidden: {type: 'boolean'},
	meta: {
		type: "object",
		properties: {
			votes: {type: 'number'},
			favs: {type: 'number'}
		}
	},
	
	_id: {type: 'string', auto: true},
}
BlogSchema.plugin( jsonform, {} );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog({_id: 1});


 describe('Suite', function(){
  	describe('.jsonform()', function(){
  		it('jsonform from BlogSchema -plain', function(){
  			this.json = doc.jsonform({});
  			assert.typeOf(this.json, 'object');
  			expect(this.json).to.be.jsonOf(BlogJsSchema);
  		});
  	});
 });
