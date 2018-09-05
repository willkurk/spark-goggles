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

const person = PropTypes.shape({
  created: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isModerator: PropTypes.bool.isRequired,
  personDisplayName: PropTypes.string.isRequired,
  personEmail: PropTypes.string.isRequired,
  personId: PropTypes.string.isRequired,
  personOrgId: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired
});

const people = PropTypes.shape({
  data: PropTypes.arrayOf(person),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
});

const room = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired
});

const rooms = PropTypes.shape({
  data: PropTypes.arrayOf(room),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
});

export default {
  registration,
  call,
  phone,
  messages,
  people,
  person,
  room,
  rooms
};
