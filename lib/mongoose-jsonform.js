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

  if(!options) options = {excludedPaths: [], includedPaths: false};
  if (!Array.isArray(options.excludedPaths)) {
    options.excludedPaths = ['__v', options.excludedPaths];
  }
  function getType( pathString, mongotype )
  {
    switch(mongotype)
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
        return {type: 'array', items: {type: 'object', properties: {}}};
      case('SchemaArray'):
        return {type: 'array', items: {}};
      default:
        /*if( options.throwExceptions){
          throw 'unknown constructor: '+path.constructor.name;
        } else {*/
          return {type: path.constructor.name}; 
        //}
    }
  }
  function convertTypeOptions(type, options){
    function replace(obj, key, newKey){
      if( obj[key] ){
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    switch(type){
      case('number'):
        replace(options, 'min', 'minimum');
        replace(options, 'max', 'maximum');
        break;
      default: break;
    }
    return options;
  }
  
  /**
   * jsonform.
   */
  schema.methods.jsonform = function (opt) {
    var self = this;
    var jf = {};
    if( !opt ) opt = {excluded: [], includes: '*', setDefaults: false};
    if( !opt.includes) opt.includes = '*';

    var excludedPaths = _.union(options.excludedPaths, opt.excludes);
    var includedPaths = _.union(options.includedPaths, opt.includes);
    function parseSchema(subschema, out){
      subschema.eachPath( function(pathString, pathO){
        
        var include = excludedPaths.indexOf(pathString) === -1;
        if(include && opt.includes!='*') 
            include = includedPaths.indexOf(pathString)!==-1;

        if(include){
          var type = getType(pathString, pathO.constructor.name);
          var defaultValue = false;
          //if( self.isInit(pathString) )
              defaultValue = self.get(pathString);

          function iterate(path, i, obj)
          {
            //console.log('iterate path: '+path);
            if (matches = path.match(/(.+)\.(.+)/)) {
              var key = matches[i+1];
              //console.log('nested-key: '+key);
              if( !obj[key] ) {
                obj[key] = {type: 'object', properties: {}}
              }
              iterate(path.substring(key.length+1), i+1, obj[key].properties);
            } else {
              if( ['string','date','boolean','number'].indexOf(type.type) >= 0 ){
                obj[path] = {};
                if( _.isFunction(pathO.options.default) ) {
                  type.default = pathO.options.default();
                }
                if(defaultValue && opt.setDefaults){
                  pathO.options.default = defaultValue;
                  if( type.type == 'date'){
                    pathO.options.default = pathO.options.default.toISOString();
                  }
                }
                _.extend(obj[path], convertTypeOptions(type.type, pathO.options), type);
              } else if( type.type == 'array' ) {
                obj[path] = type;
                if( type.items.type == 'object'){
                  parseSchema(pathO.schema, obj[path].items.properties);
                }
                else {
                  //console.log( pathString+': options:'+JSON.stringify(pathO.options.type[0]) );
                  type = getType(pathString, pathO.caster.instance);
                  
                  if( _.isFunction(pathO.options.default) ) {
                    type.default = pathO.options.default();
                  }
                  if(defaultValue && opt.setDefaults){
                    pathO.options.default = defaultValue;
                    if( type.type == 'date'){
                      pathO.options.default = pathO.options.default.toISOString();
                    }
                  }
                  _.extend(obj[path].items, convertTypeOptions(type.type, pathO.options.type[0]), type);
                  
                }
              } else {
                /*if( options.throwExceptions){
                  throw 'unknown constructor: '+path.constructor.name;
                } else {*/
                  console.log('unsupported type: '+type.type);
                //}
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