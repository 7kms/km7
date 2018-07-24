import React,{ Component,Fragment, PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import Aside from '~components/aside'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from '~less/app.less'
let cx = classNames.bind(styles)


export default class App extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
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
                <h2 className={cx('bar','flex-between')}>
                    <a className="flex-start" href="/">
                        <i className={cx('icon','km')}/>
                        <span className={cx('slogan')}>畅谈7km, 忆二塘重交</span>
                    </a>
                    <Link to='/about' className={cx('about')}>关于</Link>
                </h2>
            </header>
        )
    }
}

