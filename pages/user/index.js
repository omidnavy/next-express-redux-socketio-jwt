import React from 'react'
import Link from 'next/link'

import {connect} from 'react-redux'
import Examples from '../../frontend/react/components/examples'

class Index extends React.Component {
    static getInitialProps({reduxStore, req}) {

        return {}
    }

    componentDidMount() {
        const {dispatch} = this.props
    }


    render() {
        return (
            <div>
                <Link prefetch href="/user/omid">
                    <a>Contact</a>
                </Link>
                <Link prefetch href="/user/private">
                    <a>Private Route</a>
                </Link>
                <Examples/>
                </div>
        )
    }
}

export default connect()(Index)