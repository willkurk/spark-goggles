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
  },

  registerPhone() {
    return Promise.resolve(true);
  },

  dialPhone() {
    return Promise.resolve(true);
  },

  hangupPhone() {
    return Promise.resolve(true);
  },

  requestPermission(_permission) {
    return Promise.resolve();
  }
};
