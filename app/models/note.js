'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Note Schema
 */

var runValidatorsPlugin = function(schema, options) {
  schema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });
};

const NoteSchema = new Schema({
    title:  { type: String, required: true},
    note:   { type: String, required: true, 
            validate: {
                validator: value => {
                    return value.length > 20
                }, 
                message: 'Mongoose: note above 20 chars'
            }
    },
    mark:   [Boolean]
});
NoteSchema.plugin(runValidatorsPlugin);

var Note = mongoose.model('Note', NoteSchema, 'Note');

module.exports = Note;