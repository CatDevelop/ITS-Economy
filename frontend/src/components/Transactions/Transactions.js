import React from 'react';
import s from './Transactions.module.css';
import Transaction from "../Transaction/Transaction";

function Transactions(props) {
    return (
        <div className={s.transactions}>
            <p className={s.title}>History of operations</p>
            {
                props.transactions.map(transaction => {
                    return <Transaction {...transaction}/>
                })
            }
        </div>
    )
}

export default Transactions;