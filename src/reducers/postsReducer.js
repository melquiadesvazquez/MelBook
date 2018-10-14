import { SET_POSTS, ADD_POST, REMOVE_POST } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return action.payload
    case ADD_POST:
      return state.concat([action.post])
    case REMOVE_POST:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state;
  }
}
