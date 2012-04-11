/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , SchemaString = mongoose.SchemaTypes.String
  , errorMessages = require('./errormessages');


/**
 * Sets a minimum string length validator
 *
 * @param {Number} minimum string length
 * @param {String} optional error message
 * @api public
 */

SchemaString.prototype.min = function (value, message) {
  if (this.minValidator)
    this.validators = this.validators.filter(function(v){
      return v[1] != 'min';
    });
  if (value != null) {
    message = message || errorMessages['string']['min'];
    message = message.replace('{min}', value);
    this.validators.push([this.minValidator = function(v) {
      if ('undefined' !== typeof v)
        return v.length >= value;
    }, 'min', message]);
  }
  return this;
};

/**
 * Sets a maximum string length validator
 *
 * @param {Number} maximum string length
 * @param {String} optional error message
 * @api public
 */

SchemaString.prototype.max = function (value, message) {
  if (this.maxValidator)
    this.maxValidator = this.validators.filter(function(v){
      return v[1] != 'max';
    });
  if (value != null) {
    message = message || errorMessages['string']['max'];
    message = message.replace('{max}', value);
    this.validators.push([this.maxValidator = function(v) {
      if ('undefined' !== typeof v)
        return v.length <= value;
    }, 'max', message]);
  }
  return this;
};

/**
 * Sets a exact string length validator
 *
 * @param {Number} exact string length
 * @param {String} optional error message
 */

SchemaString.prototype.length = function (value, message) {
  if (this.lengthValidator)
    this.lengthValidator = this.validators.filter(function(v){
      return v[1] != 'length';
    });
  if (value != null) {
    message = message || errorMessages['string']['length'];
    message = message.replace('{length}', value);
    this.validators.push([this.lengthValidator = function(v) {
      if ('undefined' !== typeof v)
        return v.length == value;
    }, 'length', message]);
  }
  return this;
};

/**
 * Module exports.
 */

module.exports = SchemaString;