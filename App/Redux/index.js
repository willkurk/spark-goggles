import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

/* ------------- Import our reducers ---------- */

import { reducer as nav } from './NavigationRedux';
import { reducer as login } from './Login';
import { reducer as phone } from './Phone';

/* ------------- Assemble The Reducers ------------- */

export const reducers = combineReducers({
  login,
  nav,
  phone
});

export default () => {
  const config = configureStore(reducers, rootSaga);

  let { sagasManager } = config;
  const { store, sagaMiddleware } = config;

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
