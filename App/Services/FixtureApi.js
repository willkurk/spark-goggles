export default {
  getAccessToken() {
    return Promise.resolve('0987654321');
  },

  addPhoneListener() {
    return;
  },

  authenticate(_code) {
    return Promise.resolve('0987654321');
  },

  dialPhone() {
    return Promise.resolve(true);
  },

  getMessages() {
    return Promise.resolve({
      data: {
        items: []
      }
    });
  },

  hangupPhone() {
    return Promise.resolve(true);
  },

  registerPhone() {
    return Promise.resolve(true);
  },

  removePhoneListener() {
    return;
  },

  requestPermission(_permission) {
    return Promise.resolve();
  },

  sendMessage() {
    return Promise.resolve({
      data: { roomId: 'abcdefg' }
    });
  }
};
