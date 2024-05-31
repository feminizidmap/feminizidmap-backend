'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    data.uuid = uuidv4();
  },
};
