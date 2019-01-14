import React from 'react'
import {initializeStore} from '../../redux/store'
import {parse} from "cookie";
import {createStorageListener} from "redux-state-sync";

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return initializeStore(initialState)
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

export default (App) => {
    return class AppWithRedux extends React.Component {
        static async getInitialProps(appContext) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            let initState;

            if (isServer && appContext.ctx.req.headers.cookie && parse(appContext.ctx.req.headers.cookie).token) initState = {isAuthenticate: true};
            const reduxStore = getOrCreateStore(initState);

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext)
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
                hello:'omid'
            }
        }

        constructor(props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }
        componentDidMount() {
            const config = {
                // predicate: actionType => actionType !== 'GET_USER_INFO',
            };
            createStorageListener(this.reduxStore, config)
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore}/>
        }
    }
}