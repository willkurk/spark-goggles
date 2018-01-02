export default {
  generateGuestToken(name, sub) {
    return Promise.resolve({
      data: {
        name,
        sub,
        token: '1234567890'
      }
    });
  },

  exchangeGuestToken(_guestToken) {
    return Promise.resolve('0987654321');
  }
};
