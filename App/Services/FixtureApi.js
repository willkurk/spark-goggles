export default {
  acceptIncomingCall({ _localView, _remoteView }) {
    return Promise.resolve(true);
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

  getAccessToken() {
    return Promise.resolve('0987654321');
  },

  getMessages() {
    return Promise.resolve({
      data: {
        items: []
      }
    });
  },

  getTeams() {
    return Promise.resolve({
      data: {
        items: []
      }
    });
  },

  getTeamMembers() {
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

  rejectIncomingCall() {
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
  },

  takeSnapshot() {
    return Promise.resolve(true);
  },

  getRooms() {
    return Promise.resolve({
      data: {
        items: []
      }
    });
  }
};
