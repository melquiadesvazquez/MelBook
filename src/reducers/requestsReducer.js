import {GET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from '../actions/types';
import {isEmpty} from '../helpers';

const initialState = {
  approved: [],
  pending: []
}

export default function (state = initialState, action) {
  let requests = state;
  switch (action.type) {
    case GET_REQUESTS:
      return action.payload;

    case ADD_PENDING_FOLLOWER:
      requests.approved[action.following] = (!isEmpty(requests.approved[action.following]) && requests.approved[action.following].filter(uuid => uuid !== action.follower)) || [];
      requests.pending[action.following] = (!isEmpty(requests.pending[action.following]) && requests.pending[action.following].push(action.follower)) || [action.follower];
      localStorage.setItem(`melbook:requests`, JSON.stringify(requests));
      return {...requests};

    case ADD_APPROVED_FOLLOWER:
      requests.approved[action.following] = (!isEmpty(requests.approved[action.following]) && requests.approved[action.following].push(action.follower)) || [action.follower];
      requests.pending[action.following] = (!isEmpty(requests.pending[action.following]) && requests.pending[action.following].filter(uuid => uuid !== action.follower)) || [];
      localStorage.setItem(`melbook:requests`, JSON.stringify(requests));
      return {...requests};

    case REMOVE_APPROVED_FOLLOWER:
      requests.approved[action.following] = requests.approved[action.following].filter(uuid => uuid !== action.follower);
      localStorage.setItem(`melbook:requests`, JSON.stringify(requests));
      return {...requests};

    default:
      return state;
  }
}