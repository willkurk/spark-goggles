import apisauce from 'apisauce';
import Secrets from 'react-native-config';

const create = () => {
  const api = apisauce.create({
    baseURL: Secrets.AUTHORIZATION_ENDPOINT
  });

  const generateToken = (name, userId) => {
    return api.post('/', { name, sub: userId });
  };

  return {
    generateToken
  };
};

export default {
  create
};
