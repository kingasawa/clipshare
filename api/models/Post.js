/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    imdb : {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    thumbnail: {
      type: 'string'
    },
    source: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    director: {
      type: 'array'
    },
    cast: {
      type: 'array'
    },
    time: {
      type: 'integer'
    },
    year: {
      type: 'integer'
    },
    view: {
      type: 'integer',
      defaultsTo: 0
    },
    rate: {
      type: 'string',
      defaultsTo: '0'
    },
    featured: {
      type: 'integer'
    },
    cid: {
      model: 'category'
    },
    uid: {
      model: 'user'
    }
  }
};
