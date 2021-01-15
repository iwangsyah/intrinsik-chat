import _ from 'lodash';
import { Astorage } from '../util';
import { ActionTypes as types } from '../configs';

export default class Actions {
  static setPhoneNumber(phoneNumber) {
    return {
      type: types.SET_PHONE_NUMBER,
      phoneNumber
    };
  }

  static setPropertyName(propertyName) {
    return {
      type: types.SET_PROPERTY_NAME,
      propertyName
    };
  }

  static setAddress(address) {
    return {
      type: types.SET_ADDRESS,
      address
    };
  }

  static setPayment(payment) {
    return {
      type: types.SET_PAYMENT,
      payment
    };
  }

  static setLantai(floors) {
    return {
      type: types.SET_LANTAI,
      floors
    };
  }

  static setRooms(rooms) {
    return {
      type: types.SET_ROOMS,
      rooms
    };
  }

  static setRoomTypeList(roomTypeList) {
    return {
      type: types.SET_ROOM_TYPE_LISTS,
      roomTypeList
    };
  }

  static setRoomStaffList(roomStaffList) {
    return {
      type: types.SET_ROOM_STAFF_LISTS,
      roomStaffList
    };
  }

  static getRoomTypeList(roomTypeList) {
    return {
      type: types.GET_ROOM_TYPE_LISTS,
      roomTypeList
    };
  }

  static logout() {
    Astorage.removeAuthToken();
    return {
      type: types.LOGOUT
    };
  }
}
