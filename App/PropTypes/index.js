import PropTypes from 'prop-types';

const registration = PropTypes.shape({
  complete: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
});

const call = PropTypes.shape({
  ringing: PropTypes.bool.isRequired,
  connected: PropTypes.instanceOf(Date),
  person: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isInitiator: PropTypes.bool
  })
});

const phone = PropTypes.shape({
  permissionsGranted: PropTypes.bool.isRequired,
  registration: registration.isRequired,
  call: call.isRequired
});

const messages = PropTypes.shape({
  roomId: PropTypes.string,
  data: PropTypes.array
});

export default {
  registration,
  call,
  phone,
  messages
};
