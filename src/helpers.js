export const isEmpty = (value) => {
  return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
  );
}

export const mapUsers = (users) => {
  return Object.assign({}, ...users.map((user) => ({[user.login.uuid]: user})));
}

export const isFollower = (follower, following, requests) => {
  let result = false;
  if (requests && requests.pending && !isEmpty(requests.pending[following]) && requests.pending[following].includes(follower)) {
    result = 'pending';
  }
  else
  if (requests && requests.approved && !isEmpty(requests.approved[following]) && requests.approved[following].includes(follower)) {
    result = 'approved';
  }
  return result;
}