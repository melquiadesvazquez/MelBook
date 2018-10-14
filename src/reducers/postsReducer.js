import { GET_POSTS, ADD_POST, REMOVE_POST } from '../actions/types';

export default function (state = {}, action) {
  let posts = state;
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    case ADD_POST:
      posts = state.concat([action.post])
      localStorage.setItem(`melbook:posts:${action.uuid}`, JSON.stringify(posts));
      return posts;
    case REMOVE_POST:
      posts = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
      localStorage.setItem(`melbook:posts:${action.uuid}`, JSON.stringify(posts));
      return posts;
    default:
      return state;
  }
}
