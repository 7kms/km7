import React,{ PureComponent } from 'react'
import { Link , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
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
    constructor({match,navList}){
        super()
        this.defaultCategory = navList[0].key;
        const {category=this.defaultCategory} = match.params;
        const patternStr = navList.map(item=>item.key).join('|')
        const reg = new RegExp(`${patternStr}`,'ig')
        const intialObj = {category}
        if(!reg.test(category)){
            intialObj.needRedirect = true;
        }
        this.state = intialObj
    }
    header = {
        title: 'km7 突破web前端开发',
        metas: [
            {
                name: 'keywords',
                content: 'km7, web前端突破, web前端, 突破web前端, 突破前端开发, 大前端'
            },
            {
                name: 'description',
                content: '突破web前端开发, km7的前端开发日志, 记录前端开发中的重难点, 突破前端开发'
            }
        ]
    }
    state = {
        params: Home.initialParams
    }
    static loadInitialData = async (store,match)=>{
        const {category} = match.params;
        return Promise.all([
            store.dispatch(fetchNav()),
            store.dispatch(fetchList(category,Home.initialParams))
        ])
    }
    getList = (params)=>{
        const {dispatch,match:{params:{category}}} = this.props;
        params = params || this.state.params;
        dispatch(fetchList(category,params))
    }
    loadMore = ()=>{
        const {params} = this.state;
        params.page++
        this.getList(params)
    }
    componentDidMount(){
        const {articleList} = this.props;
        if(!articleList.length){
            this.getList()
        }
    }
    componentDidUpdate(){
        const {articleList} = this.props;
        if(!articleList.length){
            this.getList()
        }
    }
    goDetail = (item)=>{
       const {id} = item;
       this.props.history.push(`/article/${id}`);
    }
    onNavChange = ()=>{
        this.props.dispatch(emptyList())
    }
    render(){
        const {articleList,navList} = this.props;
        const {needRedirect} = this.state;
        const {category=this.defaultCategory} = this.props.match.params;
        if(needRedirect){
            return <Redirect to="/"/>
        }
        return (
            <PageHead header={this.header}>
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
    changeNav = (newCate)=>{
        const {category} = this.props
        if(newCate !== category){
            this.props.onChange(category)
        }
    }
    render(){
        const {list,category} = this.props
        return (
            <nav className={cx('nav','text-center')}>
                <div className={cx('nav-content')}>
                    <ul className={cx('nav-list','fl')}>
                        {list.map((item,index)=> <li key={index} className={cx('nav-item',{active: item.key === category})}>
                            <Link onClick={()=>this.changeNav(item.key)} to={`/${item.key}`}>{item.name}</Link>
                        </li>)}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Home