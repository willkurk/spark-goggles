export default {
  getAccessToken() {
    return Promise.resolve('0987654321');
  },

  authenticate(_code) {
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
