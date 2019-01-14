import React from 'react'
import Link from 'next/link'

import ClientHOC from '../../frontend/react/hoc/client'
import {getUserInfo, login} from "../../frontend/redux/actions";
import {serverSideCookieSerilizer} from "../../libs/cookie"

class Index extends React.Component {

    static async getInitialProps(pageProps) {
        const {dispatch} = pageProps.reduxStore;
        let serverSideCookie = serverSideCookieSerilizer(pageProps.req);
        await dispatch(getUserInfo(47, serverSideCookie));
        return {pathname: pageProps.pathname}
    }

    componentDidMount() {
        console.log(this.props)
    }

    reset = () => this.props.dispatch(getUserInfo(47));

    login = () => this.props.dispatch(login({username: 'omid', password: 'salam'}));


    render() {
        const {userInfo} = this.props;
        return (
            <div>
                <Link prefetch href="/user/omid">
                    <a>Contact</a>
                </Link>
                <div>this is a client page</div>
                <div>
                    <span>{userInfo ? JSON.stringify(userInfo) : 'no data'}</span>
                    <button onClick={this.login}>login</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            </div>
        )
    }


}

export default ClientHOC(Index)