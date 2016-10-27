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
    view: {
      type: 'integer'
    },
    rate: {
      type: 'integer'
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
