import apisauce from 'apisauce';

const create = () => {
  const api = apisauce.create({
    baseURL: 'https://7s6pizsaij.executeapi.uswest2.amazonaws.com/dev/jwt'
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
