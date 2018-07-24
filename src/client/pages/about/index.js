import React,{ Component } from 'react'
import {getPageMeta} from '~data'
// import PropTypes from 'prop-types'
import PageHead from '~components/PageHead'

export default class Page extends Component{
    constructor(){
        super()
        this.pageHeader = getPageMeta('关于');
    }
    render(){
        return (
            <PageHead header={this.pageHeader}>
                about
            </PageHead>
        )
    }
}