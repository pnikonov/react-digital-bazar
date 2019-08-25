import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import ClientApi from '../utils/api/client';

const api = new ClientApi();

export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(api), logger));