import React from 'react'
import {connect} from 'react-redux'


export default (PrivatePage) => {
    class PrivateHOC extends React.Component {
        static async getInitialProps(appContext) {
            let PrivatePageProps = {};
            if (typeof PrivatePage.getInitialProps === 'function') PrivatePageProps = await PrivatePage.getInitialProps(appContext);

            return PrivatePageProps
        }

        render() {
            const {isAuthenticate} = this.props;
            if (isAuthenticate) return <PrivatePage {...this.props} />;
            else return <div>You Must Login First</div>
        }
    }

    function mapStateToProps(state) {
        const {isAuthenticate} = state;
        return {isAuthenticate}
    }
    return connect(mapStateToProps)(PrivateHOC)
}
