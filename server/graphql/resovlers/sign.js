const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  login: async function({ email, password }) {
    const user = await User.findOne({email: email});
    if (!user) {
      const error = new Error('User not found');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('password is incorrect!');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email,
      companyId: user.company_id
    },
    'crmdevpuzzlekey',
    {  expiresIn: '1h' }
    );
    return { token: token, userId: user._id.toString() }
  }
};
