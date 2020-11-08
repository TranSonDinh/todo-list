import React, { Component } from 'react';
import classNames from 'classnames';
import check from '../img/check.svg';
import checkMark from '../img/check-mark.svg';
import cancel from '../img/cancel.svg';

class TodoItems extends Component {
    render() {
        const {item , onClick , clickCancel,chon} = this.props;
        let linkImg = checkMark;
        if(item.isComplete===true)
            linkImg = check;
         return(
            <div className={classNames('icon',{'isComplete' : item.isComplete})} >
                <img src={linkImg} height='30px' width='30px' onClick={onClick}/>
                <p>{item.title}</p>
                <img src={cancel} height={15} width={15} className='cancel' onClick={clickCancel}/>
            </div>
         );
    }
}
export default TodoItems;