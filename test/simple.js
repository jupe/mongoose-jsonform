/* mocha tests will be here.. */
var mocha = require('mocha')
  , Chai = require("chai")
  , assert = Chai.assert
  , expect = Chai.expect
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , jsonform = require('../');

Chai.use(require('chai-fuzzy'));
var now = new Date().getTime();

var BlogSchema = new Schema({
  title:  {type: String, required: true, 
  	//These keys are just for jsonform!
  	title: 'X', 
  	description: 'x',
  	maxLength: 10
  },
  author: String,
  url: {type: String, 
  	//these keys are just for jsonform!
  	format: 'url'
  },
  body:   String,
  comments: [{ 
	body: String, 
  	//date:{type: Date, default: now} 
  }],
  date: { type: Date, default: now },
  hidden: Boolean,
  meta: {
    votes: {type: Number, min: 3, max: 10},
    favs:  Number
  }
});
var BlogJsSchema = {
	title: {
		
		type: 'string',
		required: true,
		title: 'X',
		description: 'x',
		maxLength: 10
	},
	
	author: {type: 'string', default: 'jva'},
	url: {type: 'string', format: 'url'},
	body: {type: 'string'},
	comments: {
		type: 'array',
		items: {
			body: {type: 'string'},
			//date: {type: 'date', default: new Date(now)},
			_id: {type: 'string', auto: true}
		}
	},
	date: {type: 'date', default: (new Date(now).toISOString())},
	hidden: {type: 'boolean'},
	meta: {
		type: "object",
		properties: {
			votes: {type: 'number', minimum: 3, maximum: 10},
			favs: {type: 'number'}
		}
	},
	_id: {type: 'string', auto: true},
  __v: {type: 'number'}
}
BlogSchema.plugin( jsonform );
var Blog = mongoose.model('Blog', BlogSchema);
var doc = new Blog({_id: 1, author: 'jva'});


 describe('Suite', function(){
  	describe('.jsonform()', function(){
  		it('jsonform from BlogSchema -default', function(){
  			this.json = doc.jsonform({setDefaults: true});
  			assert.typeOf(this.json, 'object');
  			expect(this.json).to.be.jsonOf(BlogJsSchema);
  		});
  	});
 });
