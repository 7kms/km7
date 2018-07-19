import React,{ Component,Fragment, PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import Aside from '~components/aside'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from '~less/app.less'
let cx = classNames.bind(styles)


export default class App extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
   
    // static loadInitialData = (store)=>{
    //     return store.dispatch(fetchNav())
    // }
   
    render(){
        return (
            <Fragment>
               <Header/>
                <div className={cx('wrap')}>
                    <section className={cx('main')}>
                        {renderRoutes(this.props.route.routes)}
                    </section>
                    <Aside/>
                </div>
            </Fragment>
        )
    }
}

class Header extends PureComponent{
    render(){
        return (
            <header className={cx('header')}>
                <h2>slogan</h2>
                {/* <Nav nav={this.props.nav} onChange={this.onNavChange}/> */}
            </header>
        )
    }
}

