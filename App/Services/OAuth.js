import url from 'url';
import querystring from 'querystring';
import Config from 'react-native-config';

const generateRedirectURL = state => {
  const query = querystring.stringify({
    client_id: Config.SPARK_CLIENT_ID,
    redirect_uri: Config.SPARK_REDIRECT_URI,
    scope: Config.SPARK_SCOPE,
    response_type: 'code',
    state
  });

  return `${Config.SPARK_ENDPOINT}?${query}`;
};

const checkAuthorization = ({ url: value, state }) => {
  const redirectUri = url.parse(Config.SPARK_REDIRECT_URI);
  const location = url.parse(value);
  const params = querystring.parse(location.query);

  if (params.error) {
    return { error: params.error };
  }

  if (redirectUri.protocol !== location.protocol) {
    return {};
  }

  if (redirectUri.host !== location.host) {
    return {};
  }

  if (params.state !== state) {
    return { error: 'State parameter does not match' };
  }

  return { code: params.code };
};

export default {
  generateRedirectURL,
  checkAuthorization
};
