import { SET_CURRENT_USER } from '../actions/types';
import {isEmpty} from '../helpers';

const initialState = {
  isAuthenticated: false,
  uuid: '',
  dummydata: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.uuid),
        uuid: action.uuid,
        dummydata: action.dummydata
      }
    default:
      return state;
  }
};