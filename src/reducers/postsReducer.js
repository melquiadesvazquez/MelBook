import { SET_POSTS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return action.payload
    default:
      return state;
  }
}