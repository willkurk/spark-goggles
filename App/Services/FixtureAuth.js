export default {
  generateToken (name, sub) {
    return Promise.resolve({
      ok: true,
      data: {
        name,
        sub,
        token: '1234567890'
      }
    });
  }
};
