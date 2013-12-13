/*!
 * mongoose-jsonform - lib/mongoose-jsonform.js
 * Copyright(c) 2013 jussiva <jussiva@gmail.com>
 * MIT Licensed
 */
/**
 * Module dependencies.
 */
var _ = require('underscore');

var jsonform = function(schema, options) {
  if (!Array.isArray(options.excludedFields)) {
    options.excludedPaths = ['__v', options.excludedFields];
  }
  function getType( pathString, path )
  {
    switch(path.constructor.name)
    {
      case('String'):
      case('SchemaString'):
        return { type: 'string' };
      case('SchemaDate'):
        return { type: 'date' };
      case('SchemaBoolean'):
        return { type: 'boolean' };
      case('SchemaNumber'):
        return { type: 'number' };
      case('ObjectId'):
        return { type: 'string' };
      case('DocumentArray'):
        return {type: 'array', items: {}};
      default: 
        console.log('unknown constructor: '+path.constructor.name);
        return {type: path.constructor.name};
    }
  }
  
  /**
   * jsonform.
   */
  schema.methods.jsonform = function (opt) {
    var self = this;
    var jf = {};
    var excludedPaths = _.union(options.excludedPaths, opt.excludes);
    function parseSchema(subschema, out){
      subschema.eachPath( function(pathString, pathO){
        if(excludedPaths.indexOf(pathString) == -1){
          var type = getType(pathString, pathO);
          
          function iterate(path, i, obj)
          {
            console.log('iterate path: '+path);
            if (matches = path.match(/(.+)\.(.+)/)) {
              var key = matches[i+1];
              console.log(key);
              obj[key] = {type: 'object', properties: {}}
              iterate(path.substring(key.length+1), i+1, obj[key].properties);
            } else {
              if( ['string','date','boolean','number'].indexOf(type.type) >= 0 ){
                obj[path] = {};
                if( _.isFunction(pathO.options.default) ) {
                  type.default = pathO.options.default();
                }
                _.extend(obj[path], pathO.options, type);
              } else if( type.type == 'array' ) {
                console.log('path: '+path+', Type: array, '+pathString);
                obj[path] = {type: 'array', items: {}}
                _.extend(obj[path], pathO.options, type);
                parseSchema(pathO.schema, obj[path].items);
              } else {
                //console.log(type);
              }
            } 
          }
          iterate( pathString, 0, out );
        }
      });
    }
    parseSchema(schema, jf);
    return jf;
  }
}
module.exports = exports =  jsonform;
