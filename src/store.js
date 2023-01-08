import { compose, createStore } from 'redux';
import config from './global/config';
import reducer from './root-reducer';
import { translations } from './translations';

// Check for dev env, if false hide extensions like redux
const { isDev, isBrowser } = config;
const devtools =
  isDev && isBrowser && window.devToolsExtension
    ? window.devToolsExtension
    : () => (fn) => fn;

let store = null;

const configureStore = (initialState = {}, services = {}) => {
  const enhancers = [devtools()];
  store = createStore(reducer, initialState, compose(...enhancers));
  return store;
};

export { configureStore, store };
