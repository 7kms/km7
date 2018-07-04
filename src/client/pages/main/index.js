import React,{ Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import KM7Page from '~components/KM7Page'
import {fetchList} from '~actions/article'



const mapStateToProps = ({articleInfo:{list}})=>{
    return {
        list
    }
}

@connect(mapStateToProps)
class Home extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        list: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    header = {
        title: 'ssr title',
        metas: [{
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:site',
            content: '@newsdogapp'
        },
        {
            property: 'fb:app_id',
            content: '508207026019625'
        }],
        links: [{
            rel: 'image_src',
            href: 'ahdoadaj'
        }]
    }
    state = {
        params: {
            page: 0,
            size: 20
        }
    }
    static loadInitialData = (store,match)=>{
        const {category} = match.params;
        return store.dispatch(fetchList(category,{
            page: 0,
            size: 20
        }))
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
        const {list} = this.props;
        if(!list.length){
            this.getList()
        }
    }
    componentDidUpdate(){
        const {list} = this.props;
        if(!list.length){
            this.getList()
        }
    }
    render(){
        const {list} = this.props;
        return (<KM7Page header={this.header}>
            {list.map((item,index)=>{
                return <div key={index}>{item.title}</div>
            })}
        </KM7Page>)
    }
}


export default Home