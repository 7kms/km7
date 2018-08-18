import React, {PureComponent} from 'react';
import styles from '~less/app.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class Aside extends PureComponent{


    render(){
        return (<section className={cx('aside')}>
            <div style={{position:'fixed'}}>panel</div>
        </section>)
    }
}

export default Aside