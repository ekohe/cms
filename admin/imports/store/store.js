import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../client/reducers/rootReducer';

const logger = createLogger();

const Store = createStore(rootReducer,
                          {},
                          compose(applyMiddleware(ReduxThunk, logger),
                          window.devToolsExtension ? window.devToolsExtension() : f => f));
export default Store;
