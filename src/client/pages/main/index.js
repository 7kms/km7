import React,{ PureComponent } from 'react'
import { Link , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getPageMeta} from '~data'
import PageHead from '~components/PageHead'
import {fetchList,emptyList} from '~actions/article'
import {fetchNav} from '~actions/nav'
import TableView from './tableview'
import classNames from 'classnames/bind'
import styles from '~less/main.less'
let cx = classNames.bind(styles)

const mapStateToProps = ({articleInfo:{list:articleList},navInfo:{list:navList}})=>{
    return {
        articleList,
        navList
    }
}

@connect(mapStateToProps)
class Home extends PureComponent{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        articleList: PropTypes.array.isRequired,
        navList: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    
    static initialParams = {
        page: 0,
        size: 20
    }
    constructor(props){
        super()
        const initialState = Home.generateInitialState(props)
        this.state = initialState;
        if(!initialState.waiting){
            this.initialed = true;
        }
        this.pageHeader = getPageMeta('首页');
    }
    static loadInitialData = async (store,match)=>{
        const {category} = match.params;
        return Promise.all([
            store.dispatch(fetchNav()),
            store.dispatch(fetchList(category,Home.initialParams))
        ])
    }
    static getDerivedStateFromProps = (props, state)=>{
        const {navList} = props;
        const {waiting} = state;
        if(waiting && navList.length){
            let newState = Home.generateInitialState(props)
            newState.waiting = false;
            return newState;
        }
        return null;
    }
    static generateInitialState = ({match,navList})=>{
        if(!navList.length){
            return {
                waiting: true
            }
        }
        let defaultCategory = navList[0].key;
        const {category = defaultCategory} = match.params;
        const patternStr = navList.map(item=>item.key).join('|')
        const reg = new RegExp(`^(${patternStr})$`,'ig')
        const initialObj = {
            category,
            params: {...Home.initialParams}
        }
        if(!reg.test(category)){
            initialObj.needRedirect = true;
        }
        return initialObj
    }
    getList = (params)=>{
        const {dispatch} = this.props;
        params = params || this.state.params;
        // console.log(this.state.category)
        dispatch(fetchList(this.state.category,params))
    }
    loadMore = ()=>{
        const {params} = this.state;
        params.page++
        this.getList(params)
    }
    componentDidMount(){
        console.log('-------componentDidMount-------')
        const { waiting } = this.state;
        if(waiting){
            this.props.dispatch(fetchNav())
        }
    }
    componentDidUpdate(prevProps,prevState){
        // console.log('-------componentDidUpdate-------prevProps,prevState,this.props,this.state', prevProps, prevState,this.props,this.state)
        const { needRedirect, waiting } = this.state;
        const {articleList} = this.props;
        if(!this.initialed && !waiting && !needRedirect){
            this.initialed = true;
            this.getList()
        } else if(this.initialed && articleList.length == 0){
            this.getList()
        }
    }
    goDetail = (item)=>{
       const {id} = item;
       this.props.history.push(`/article/${id}`);
    }
    onNavChange = (category)=>{
        // console.log(category)
        this.setState({
            category
        })
        this.props.dispatch(emptyList())
    }
    render(){
        const {articleList,navList} = this.props;
        const {needRedirect, waiting, category} = this.state;
        if(waiting){
            return null;
        }
        if(needRedirect){
            return <Redirect to="/"/>
        }
        return (
            <PageHead header={this.pageHeader}>
                <Nav list={navList} category={category} onChange={this.onNavChange}/>
                <TableView list={articleList} onLoadMore={this.loadMore} onClick={this.goDetail}/>
            </PageHead>)
    }
}


class Nav extends PureComponent{
    static propTypes = {
        category: PropTypes.string,
        list: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }
    changeNav = (e,newCate)=>{
        // e.preventDefault();
        const {category} = this.props
        if(newCate !== category){
            this.props.onChange(newCate)
        }
    }
    render(){
        const {list,category} = this.props
        return (
            <nav className={cx('nav','text-center')}>
                <div className={cx('nav-content')}>
                    <ul className={cx('nav-list','fl')}>
                        {list.map((item,index)=> <li key={index} className={cx('nav-item',{active: item.key === category})}>
                            <Link onClick={(e)=>this.changeNav(e,item.key)} to={`/${item.key}`}>{item.name}</Link>
                        </li>)}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Home