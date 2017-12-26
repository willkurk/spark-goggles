import apisauce from 'apisauce';
import Secrets from 'react-native-config';

const create = () => {
  const api = apisauce.create({
    baseURL: Secrets.AUTHORIZATION_ENDPOINT
  });

  const generateToken = (name, sub) => {
    return api.post('/', { name, sub });
  };

  return {
    generateToken
  };
};

export default {
  create
};
