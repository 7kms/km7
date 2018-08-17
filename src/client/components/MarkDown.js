import React, {PureComponent} from 'react'
// https://github.com/rexxars/react-markdown
import ReactMarkdown from 'react-markdown'
// https://github.com/sindresorhus/github-markdown-css
// import 'stylecss-loader!github-markdown-css/github-markdown.css'
import 'github-markdown-css'
import '~less/markdown.less'
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css'
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

export default class Markdown extends PureComponent{
    componentDidMount(){
        this.$content.querySelectorAll('pre').forEach(dom=>{
            hljs.highlightBlock(dom);
        })
    }
    render(){
        return (
            <article ref={node=>this.$content=node} className="markdown-body">
                <ReactMarkdown {...this.props}/>
            </article>
            )
    }
}