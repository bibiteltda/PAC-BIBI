const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',

  description: 'Criptografa a senha antes de salvar no banco.',

  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      outputFriendlyName: 'Hashed password'
    }
  },

  fn: async function (inputs) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(inputs.password, salt);
    return hashed;
  }
};