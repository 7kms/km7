import React,{ Component,Fragment, PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import Aside from '~components/aside'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import {slogan} from '~data'

import styles from '~less/app.less'
let cx = classNames.bind(styles)


export default class App extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
   
    // static loadInitialData = (store)=>{
    //     return store.dispatch(fetchNav())
    // }
   
    render(){
        const {location} = this.props;
        return (
            <Fragment>
               <Header/>
                <div className={cx('wrap',{home: !(/article|about/.test(location.pathname))})}>
                    <section className={cx('main')}>
                        {renderRoutes(this.props.route.routes)}
                    </section>
                    <Aside/>
                </div>
                { /about/.test(location.pathname) ? <footer className={cx('footer')}>&copy;2018 · 7km · 渝ICP备15003350号-1</footer> : null}
            </Fragment>
        )
    }
}

class Header extends PureComponent{
    render(){
        return (
            <div className={cx('header')}>
                <h2 className={cx('bar','flex-between')}>
                    <a className="flex-start" href="/">
                        <i className={cx('icon','km')}/>
                        <span className={cx('slogan')}>{slogan}</span>
                    </a>
                    <Link to='/about' className={cx('about')}>关于</Link>
                </h2>
            </div>
        )
    }
}

