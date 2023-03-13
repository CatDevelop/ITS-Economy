import React from 'react';
import s from './Transaction.module.css';
import classNames from 'classnames/bind';

function Transaction(props) {
    return (
        <div className={s.container}>
            <div className={s.transactionContainer}>
                <p className={s.name}>{props.fromName}</p>
                <p className={s.description}>{props.description}</p>
                <p className={classNames(s.transaction, (props.transaction > 0? s.plus : s.minus))}>{(props.transaction > 0? "+" : "") + props.transaction + ".00$"}</p>
            </div>
        </div>
    )
}

export default Transaction;