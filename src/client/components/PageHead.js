import React,{ Component,Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

export default class Page extends Component{
    static propTypes = {
        header: PropTypes.object,
        children: PropTypes.any
    }
    render(){
        const {header} = this.props;
        return (
            <Fragment>
                {header ? <Helmet>
                    {header.title ? <title>{header.title}</title> : null}
                    {header.metas ? header.metas.map((meta,index)=> <meta key={index} {...meta} />) : null}
                    {header.links ? header.links.map((link,index)=> <link key={index} {...link} />) : null}
                </Helmet> : null}
                {this.props.children}
            </Fragment>
        )
    }
}