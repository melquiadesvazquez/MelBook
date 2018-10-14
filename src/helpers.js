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