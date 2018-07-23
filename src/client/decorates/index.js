import React,{Component} from 'react';
import PropTypes from 'prop-types';
import PagePropsService from '../service/page-props';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const initPageProps = (Page)=>{
    class PropsPage extends Component{
        static propTypes = {
            match: PropTypes.object,
        }
        constructor(props){
            super(props)
            this.state = {
                pageProps: PagePropsService.getPropsByPath(props.match.path)
            }
        }
        render(){
            const {pageProps} = this.state;
            
            return (
                <Page {...this.props} {...pageProps}/>
            )
        }
    }
    let target = hoistNonReactStatics(PropsPage,Page)
   return target
}