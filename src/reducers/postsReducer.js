import { GET_POSTS, ADD_POST, REMOVE_POST } from '../actions/types';

export default function (state = {}, action) {
  const posts = {...state};

  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case ADD_POST:
      posts[action.uuid] = posts[action.uuid] || [];
      posts[action.uuid] = posts[action.uuid].concat(action.post);
      return posts;

    case REMOVE_POST:
      posts[action.uuid] = posts[action.uuid] || [];
      posts[action.uuid] = [
        ...posts[action.uuid].slice(0, action.index),
        ...posts[action.uuid].slice(action.index + 1)
      ];
      return posts;

    default:
      return state;
  }
};