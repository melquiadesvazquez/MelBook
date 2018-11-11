import {GET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from '../actions/types';
import {isEmpty} from '../helpers';

export default function (state = {}, action) {
  const requests = {...state};

  switch (action.type) {
    case GET_REQUESTS:
      return action.payload;

    case ADD_PENDING_FOLLOWER:
      requests.pending = requests.pending || {};

      requests.pending[action.following] = (!isEmpty(requests.pending[action.following]) && requests.pending[action.following].concat(action.follower)) || [action.follower];

      return requests;

    case ADD_APPROVED_FOLLOWER:
      requests.approved = requests.approved || {};
      requests.pending = requests.pending || {};

      requests['approved'][action.following] = (!isEmpty(requests['approved'][action.following]) && requests['approved'][action.following].concat(action.follower)) || [action.follower];
      requests.pending[action.following] = (!isEmpty(requests.pending[action.following]) && requests.pending[action.following].filter(uuid => uuid !== action.follower)) || [];

      return requests;

    case REMOVE_APPROVED_FOLLOWER:
      requests['approved'] = requests['approved'] || {};

      requests['approved'][action.following] = requests['approved'][action.following].filter(uuid => uuid !== action.follower);

      return requests;

    default:
      return state;
  }
};