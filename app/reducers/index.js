import { combineReducers } from 'redux';
import roomList from './RoomList';
import user from './User';

const appReducer = combineReducers({
  roomList,
  user
});

const rootReducer = (state, action) =>
  //   if (action.type === types.LOGOUT) {
  //     state = undefined;
  //   }
  appReducer(state, action);
export default rootReducer;
