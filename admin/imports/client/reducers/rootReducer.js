import { combineReducers } from 'redux';
import snackMessages from './snackMessages';
import navigationVisibility from './navigationVisibility';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({snackMessages, navigationVisibility, routing: routerReducer});

export default rootReducer;
