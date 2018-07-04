import React,{ Component,Fragment, PureComponent } from 'react'
import { Link , Redirect} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import {fetchNav} from '~actions/nav'
import {emptyList} from '~actions/article'
import styles from '~less/app.less'
let cx = classNames.bind(styles)

const nav2 = [
    {name:'关于',url:'/about',key:'about'}
]

const mapStateToProps = ({navInfo:{list}})=>{
    return {
        nav: list
    }
}

@connect(mapStateToProps)
export default class App extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.array.isRequired
    }
    constructor({match,nav}){
        super()
        this.defaultCategory = nav[0].key
        const {category=this.defaultCategory} = match.params;
        const patternStr = Array.prototype.concat.call([],nav,nav2).map(item=>item.key).join('|')
        const reg = new RegExp(`${patternStr}`,'ig')
        const intialObj = {category}
        if(!reg.test(category)){
            intialObj.needRedirect = true;
        }
        this.state = intialObj
    }
    static loadInitialData = (store)=>{
        return store.dispatch(fetchNav())
    }
    onNavChange = ()=>{
        this.props.dispatch(emptyList())
    }
    render(){
        const {needRedirect} = this.state;
        const {category=this.defaultCategory} = this.props.match.params;
        if(needRedirect){
            return <Redirect to="/"/>
        }
        return (
            <Fragment>
                <Nav category={category} nav={this.props.nav} onChange={this.onNavChange}/>
                <section className={cx('main')}>
                    {renderRoutes(this.props.route.routes)}
                </section>
            </Fragment>
        )
    }
}

class Nav extends PureComponent{
    static propTypes = {
        category: PropTypes.string,
        nav: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }
    changeNav = (newCate)=>{
        const {category} = this.props
        if(newCate !== category){
            this.props.onChange(category)
        }
    }
    render(){
        const {nav,category} = this.props
        return (
            <nav className={cx('nav','text-center')}>
            <div className={cx('nav-content')}>
                <ul className={cx('nav-list','fl')}>
                    {nav.map((item,index)=> <li key={index} className={cx('nav-item',{active: item.key === category})}>
                        <Link onClick={()=>this.changeNav(item.key)} to={`/${item.key}`}>{item.name}</Link>
                    </li>)}
                </ul>
                <ul className={cx('nav-list','fr')}>
                    {nav2.map((item,index)=><li key={index} className={cx('nav-item',{active: item.key === category})}>
                    <Link onClick={()=>this.changeNav(item.key)} to={`/${item.key}`}>{item.name}</Link>
                    </li>)}
                </ul>
            </div>
        </nav>
        )
    }
}