import React from 'react'
import Link from 'next/link'

import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../../frontend/redux/actions'
import Examples from '../../frontend/react/components/examples'

class Omid extends React.Component {
       componentDidMount() {
        const {dispatch} = this.props
    }


    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link prefetch href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link prefetch href="/user">
                            <a>User</a>
                        </Link>
                    </li>
                    <li>
                    </li>
                </ul>
            </nav>        )
    }
}

export default connect()(Omid)