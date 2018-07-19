import React,{ Component } from 'react'
import {fetchArticle} from '~actions/article'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = ({articleInfo:{article}})=>{
    return {
        article
    }
}

@connect(mapStateToProps)
export default class Article extends Component{
    static propTypes = {
        article: PropTypes.object.isRequired
    }

    static loadInitialData = (store,match)=>{
        const {id} = match.params;
        return store.dispatch(fetchArticle(id))
    }
    render(){
        const {article} = this.props;
        console.log(article)
        return (
            <div>Articles</div>
        )
    }
}