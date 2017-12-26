export default {
  generateToken (name, sub) {
    return Promise.resolve({
      name,
      sub,
      token: '1234567890'
    });
  }
};
