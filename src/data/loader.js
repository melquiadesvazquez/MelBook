import sampleRequests from './sample-requests';
import samplePosts from './sample-posts';
import {isEmpty} from '../helpers';

export const loadStorage = () => {
  try {
    const state = localStorage.getItem('melbook:state');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  }
  catch (err) {
    return undefined;
  }
}

export const saveStorage = (state) => {
  try {
    localStorage.setItem('melbook:state', JSON.stringify(state));
  }
  catch (err) {
    console.log(err);
  }
}

export const load = async (key, dummydata = false) => {
  const state = loadStorage() || {};
  let defaultValue = [];

  if (key === 'requests') {
    defaultValue = dummydata? sampleRequests : {};
  }
  else if (key === 'posts') {
    defaultValue = dummydata? samplePosts : {};
  }
  else if (key === 'users') {
    const response = await fetch(process.env.REACT_APP_API_DATA_URL)
    const {results} = await response.json();
    state[key] = results || [];
  }

  if (!state || isEmpty(state[key])) {
    state[key] = defaultValue;
    saveStorage(state);
    return defaultValue;
  }


  return state[key];
}