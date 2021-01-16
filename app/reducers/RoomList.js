import _ from 'lodash';
import { ActionTypes as types } from '../configs';

export default function registerProperty(state, action) {
  state = state || {
    whishlist: {},
  };

  switch (action.type) {
    case types.SET_ROOM_LIST:
      state = _.assign({}, state, {
        whishlist: action.whishlist,
      });
      return state;
    default:
      return state;
  }
}
