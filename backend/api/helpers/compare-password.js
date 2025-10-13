const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Compare password',

  description: 'Compara senha informada com a senha do banco.',

  inputs: {
    password: { type: 'string', required: true },
    hashedPassword: { type: 'string', required: true }
  },

  exits: {
    success: { outputFriendlyName: 'Passwords match' }
  },

  fn: async function (inputs) {
    return await bcrypt.compare(inputs.password, inputs.hashedPassword);
  }
};