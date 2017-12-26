import apisauce from 'apisauce';

const create = () => {
  const api = apisauce.create({
    baseURL: 'https://7s6pizsaij.execute-api.us-west-2.amazonaws.com/dev/jwt'
  });

  const generateToken = (name, sub) => {
    return api.post('/', { name, sub });
  };

  const exchangeToken = (token) => {
    return api.post('https://api.ciscospark.com/v1/jwt/login', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  return {
    generateToken,
    exchangeToken
  };
};

export default {
  create
};
