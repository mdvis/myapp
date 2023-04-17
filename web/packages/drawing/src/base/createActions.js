import { createAction } from 'redux-actions';
import Immutable from 'immutable';
import axios from 'api/axios';

const createActions = function createActions(opts) {
  const optsMap = Immutable.fromJS(opts);
  return optsMap.map((v) => {
    if (typeof v !== 'string') {
      const type = v.get('type');
      const method = v.get('method') || 'get';
      const url = v.get('url');
      const isConfig = v.get('isConfig');
      if (!type) {
        return function d({ params, data } = { params: {}, data: {} }) {
          return async function u(dispatch) {
            dispatch({ type: 'SHOW_LOADING' });
            const isGet = (method === 'get');
            return axios[method](url, (isGet ? { params } : { ...data })).then((res) => {
              dispatch({ type: 'HIDE_LOADING' });
              if (isConfig) {
                res.data.configParams = res.config;
              }
              return res.data;
            });
          };
        };
      }
      return function n({ params, data } = { params: {}, data: {} }) {
        return async function a(dispatch) {
          dispatch({ type: 'SHOW_LOADING' });
          const isGet = (method === 'get');
          const result = await axios[method](url, (isGet ? { params } : { ...data }));
          if (isConfig) {
            result.data.configParams = result.config;
          }
          dispatch(createAction(type)(result.data));
          dispatch({ type: 'HIDE_LOADING' });
        };
      };
    }
    return function m(data) {
      return function e(dispatch) {
        dispatch(createAction(v)(data));
      };
    };
  }).toJS();
};

export default createActions;
