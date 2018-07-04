import React,{ Component } from 'react'
// import PropTypes from 'prop-types'
import KM7Page from '~components/KM7Page'

export default class Page extends Component{
    // static propTypes = {
    //     route: PropTypes.object.isRequired
    // }
    render(){
        return (
            <KM7Page header={{title:'About'}}>About</KM7Page>
        )
    }
}