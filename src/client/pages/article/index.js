import React,{ Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {initPageProps} from '~decorates'
import {$get} from '~utils/api'
import {dateFormat} from '~utils'
import PageHead from '~components/PageHead'
import Markdown from '~components/MarkDown'
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
                <header className={cx('header')}><h1>{article.title}</h1></header>
                <div className={cx('wrap')}>
                    <Fragment>
                        <div className={cx('flex-center','tag-list')}>
                            <i className={cx('icon','icon-tag')}></i>
                            {article.tags.map(tag=><span key={tag.id} className={cx('tag')}>{tag.name}</span>)}
                        </div>
                        <div className={cx('flex-between','info')}>
                            <div className={cx('flex-center')}><i className={cx('icon','icon-time')}></i><span className={cx('time')}>{dateFormat(article.updatedAt,'yyyy/MM/dd HH:mm')}</span></div>                
                            <div className={cx('flex-center')}><i className={cx('icon','icon-view')}></i><span className={cx('view')}>{article.view}</span></div>
                        </div>
                    </Fragment>
                    <Markdown source={article.content} className={cx('content')}/>
                </div>
            </PageHead>
        )
    }
}