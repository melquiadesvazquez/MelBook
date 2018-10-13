import { SET_REQUESTS } from '../actions/types';

const initialState = {
  approved: [],
  pending: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_REQUESTS:
    return {
      ...state,
      ...action.payload
    }
    default:
      return state;
  }
}