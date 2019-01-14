import React from 'react'
import io from "socket.io-client";
// import Private from './private'
import {actionTypes} from "../../redux/constants/action-types";
import {connect} from "react-redux";

let socket = false;


export default (PrivatePage) => {
    class ClientHOC extends React.Component {
        static async getInitialProps(appContext) {
            let PrivatePageProps = {};
            if (typeof PrivatePage.getInitialProps === 'function') PrivatePageProps = await PrivatePage.getInitialProps(appContext);
            return {...PrivatePageProps}
        }


        componentDidMount() {
            const {dispatch} = this.props;
            if (!socket) socket = io('ws://localhost:3000');
            socket.on('message', message => dispatch({
                type: actionTypes[message.request],
                payload: message.response
            }));
            socket.on('error', e => console.log(e));
            socket.on('403', e => alert(e.request + ' Permission Denied'));
            window.sendSocketMessage = message => socket.send(message);
        }

        componentWillUnmount() {
            socket.disconnect();
            socket = window.sendSocketMessage = false;
        }

        render() {
            const {isAuthenticate} = this.props;
            if (isAuthenticate) return <PrivatePage {...this.props} />;
            else return <div>You Must Login First</div>
        }
    }

    function mapStateToProps(state) {
        return state
    }

    return connect(mapStateToProps)(ClientHOC)
}
