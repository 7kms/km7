import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import styles from '~less/main.less'
import classNames from 'classnames/bind'
import {dateFormat} from '~utils'
let cx = classNames.bind(styles)


class Item extends PureComponent{
    static propTypes = {
        info: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
    }
    onClick = ()=>{
        const {info} = this.props;
        this.props.onClick(info);
    }
    render(){
        const {info} = this.props; 
        return (<li className={cx('list-item')} onClick={this.onClick}>
            <div className={cx('left')}>
                <div className={cx('flex-center','tag-list','gray','small')}>
                    <i className={cx('icon','icon-tag')}></i>
                    {info.tags.map(tag=><span key={tag.id} className={cx('tag')}>{tag.name}</span>)}
                </div>
                <h3 className={cx('title')}>{info.title}</h3>
                <div className={cx('desc')}>{info.description}</div>
                <div className={cx('flex-between','info','gray','small')}>
                    <div className={cx('flex-center')}><i className={cx('icon','icon-time')}></i><span className={cx('time')}>{dateFormat(info.updatedAt,'yyyy/MM/dd HH:mm')}</span></div>                
                    <div className={cx('flex-center')}><i className={cx('icon','icon-view')}></i><span className={cx('view')}>10</span></div>
                </div>
            </div>
            <div className={cx('right')}></div>
        </li>)
    }
}


class TableView extends PureComponent{
    static propTypes = {
        list: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    }
    render(){
        const {list} = this.props;
        return (<ul className={cx('table-view','list')}>
            {list.map((item)=><Item key={item.id} info={item} onClick = {this.props.onClick}/>)}
        </ul>)
    }
}

export default TableView