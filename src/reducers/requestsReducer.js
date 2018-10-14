import {SET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from '../actions/types';

const initialState = {
  approved: [],
  pending: []
}

export default function (state = initialState, action) {
  const requests = state;
  switch (action.type) {
    case SET_REQUESTS:
      return action.payload;
    case ADD_PENDING_FOLLOWER:
      requests.pending = requests.pending.concat([action.uuid])
      requests.approved = requests.approved.filter(uuid => uuid !== action.uuid);
      return {...requests};
    case ADD_APPROVED_FOLLOWER:
      requests.approved = requests.approved.concat([action.uuid])
      requests.pending = requests.pending.filter(uuid => uuid !== action.uuid);
      return {...requests};
    case REMOVE_APPROVED_FOLLOWER:
      requests.approved = requests.approved.filter(uuid => uuid !== action.uuid);
      return {...requests};
    default:
      return state;
  }
}