import React, {PureComponent} from 'react'
// https://github.com/rexxars/react-markdown
import ReactMarkdown from 'react-markdown'
// https://github.com/sindresorhus/github-markdown-css
// import 'stylecss-loader!github-markdown-css/github-markdown.css'
import 'github-markdown-css?inline'


export default class Markdown extends PureComponent{
    render(){
        return (<article><ReactMarkdown {...this.props} className="markdown-body"/></article>)
    }
}