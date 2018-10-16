import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {setCurrentUser} from './actions/actionCreator';
import rootReducer from './reducers';
import App from './components/App';

const initialState = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

