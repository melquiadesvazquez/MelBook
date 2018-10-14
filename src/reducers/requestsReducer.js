import {SET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from '../actions/types';

const initialState = {
  approved: [],
  pending: []
}

export default function (state = initialState, action) {
  let requests = state;
  switch (action.type) {
    case SET_REQUESTS:
      return action.payload;
    case ADD_PENDING_FOLLOWER:
      requests = {
        approved: requests.approved.filter(uuid => uuid !== action.follower),
        pending: requests.pending.concat([action.follower])
      }
      localStorage.setItem(`melbook:requests:${action.following}`, JSON.stringify(requests));
      return {...requests};
    case ADD_APPROVED_FOLLOWER:
      requests = {
        approved: requests.approved.concat([action.follower]),
        pending: requests.pending.filter(uuid => uuid !== action.follower)
      }
      localStorage.setItem(`melbook:requests:${action.following}`, JSON.stringify(requests));
      return {...requests};
    case REMOVE_APPROVED_FOLLOWER:
      requests.approved = requests.approved.filter(uuid => uuid !== action.follower);
      localStorage.setItem(`melbook:requests:${action.following}`, JSON.stringify(requests));
      return {...requests};
    default:
      return state;
  }
}