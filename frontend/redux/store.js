import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {reducer} from './reducers'
// import {emit, init as websocketInit} from './actions/websockets'

// const middleware = thunkMiddleware.withExtraArgument({emit});
import {actionStorageMiddleware} from 'redux-state-sync';

const exampleInitialState = {isAuthenticate: false};
const middlewares = [thunkMiddleware, actionStorageMiddleware];

export function initializeStore(initialState = exampleInitialState) {
    const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
    // const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(middleware)));
    // if (typeof window !== 'undefined') websocketInit(store);
    // websocketInit(store);
    return store
    // return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(middleware)))
}