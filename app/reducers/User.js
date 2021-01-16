import _ from 'lodash';
import { ActionTypes as types } from '../configs';

export default function registerProperty(state, action) {
  state = state || {
    user: {},
  };

  switch (action.type) {
    case types.SET_USER:
      state = _.assign({}, state, {
        user: action.user,
      });
      return state;
    default:
      return state;
  }
}
