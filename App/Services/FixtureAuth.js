export default {
  generateToken (name, userId) {
    return Promise.resolve({
      name,
      sub: userId,
      token: '1234567890'
    });
  }
};
