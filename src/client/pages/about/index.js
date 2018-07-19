import React,{ Component } from 'react'
// import PropTypes from 'prop-types'
import PageHead from '~components/PageHead'

export default class Page extends Component{
    // static propTypes = {
    //     route: PropTypes.object.isRequired
    // }
    render(){
        return (
            <PageHead header={{title:'About'}}>About</PageHead>
        )
    }
}