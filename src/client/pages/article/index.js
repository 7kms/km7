import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {initPageProps} from '~decorates'
import {$get} from '~utils/api'
import PageHead from '~components/PageHead'
import Markdown from '~components/Markdown'
import classNames from 'classnames/bind'
import styles from '~less/article.less'
let cx = classNames.bind(styles)

@initPageProps
export default class Article extends Component{
    static propTypes = {
        article: PropTypes.object,
        match: PropTypes.object
    }
    static loadInitialData = async (store,match)=>{
        const {id} = match.params;
        // return store.dispatch(fetchArticle(id))
        const {article} = await $get(`/article/${id}`)
        return {article}
    }
    constructor(props){
        super()
        // console.log(JSON.stringify(props))
        this.state = {
            article: props.article,
            loading: !props.article
        }
    }
    generateHeaderByArticle = (article)=>{
        if(!this.header){
            const obj = {
                title: article.title,
                metas: [
                    {
                        name: 'keywords',
                        content: article.keywords
                    },
                    {
                        name: 'description',
                        content: article.description
                    }
                ]
            }
            this.header = obj;
        }
        return this.header;
    }
    componentDidMount = async() =>{
        let {article} = this.state;
        if(!article){
            const { match } = this.props;
            const {article} = await Article.loadInitialData(null,match);
            this.setState({
                article,
                loading: false
            })
        }
    }
    render(){
        const {article,loading} = this.state;
        if(loading){
            return 'loading'
        }
        return (
            <PageHead header={this.generateHeaderByArticle(article)}>
                <div className={cx('wrap')}>
                    <h1>{article.title}</h1>
                    <Markdown source={article.content}/>
                </div>
            </PageHead>
        )
    }
}