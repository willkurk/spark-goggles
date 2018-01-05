import url from 'url';
import querystring from 'querystring';
import { Linking } from 'react-native';
import Config from 'react-native-config';

const generateRedirectURL = () => {
  const query = querystring.stringify({
    client_id: Config.SPARK_CLIENT_ID,
    redirect_uri: Config.SPARK_REDIRECT_URI,
    scope: Config.SPARK_SCOPE,
    response_type: 'code'
  });

  return `${Config.SPARK_ENDPOINT}?${query}`;
};

const redirect = () => {
  Linking.openURL(generateRedirectURL());
};

const callback = async () => {
  const initialURL = await Linking.getInitialURL();

  if (!initialURL) {
    return;
  }

  const { query } = url.parse(initialURL);
  const { code } = querystring.parse(query);
  return code;
};

export default {
  generateRedirectURL,
  callback,
  redirect
};
