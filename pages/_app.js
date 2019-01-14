import App, {Container} from 'next/app'
import React from 'react'
import {PageTransition} from 'next-page-transitions'
import withReduxStore from '../frontend/react/hoc/with-redux-store'
import {Provider} from 'react-redux'

class MyApp extends App {
    static async getInitialProps({Component, router, ctx}) {

        // if (typeof window !== "undefined") {
        //     const socket = io();
        //     socket.on('connect_error', function (m) {
        //         console.log("error");
        //     });
        //     socket.on('connect', function (m) {
        //         console.log("socket.io connection open");
        //         socket.send(JSON.stringify({request: {subject: 'user', method: 'getInfo'}, data: 47}))
        //     });
        //     socket.on('message', function (m) {
        //         console.log(m);
        //     });
        // }
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <PageTransition timeout={300} classNames="page-transition">
                        <Component key={this.props.router.route} {...pageProps} />
                    </PageTransition>
                </Provider>
                <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
            </Container>
        )
    }
}

export default withReduxStore(MyApp)