import React from 'react';
import s from './Profile.module.css';
import classNames from 'classnames/bind';

function Profile(props) {
    return (
        <div className={s.container}>
            <div className={s.transactionContainer}>
                <p className={s.name}>{props.firstName+" "+props.secondName}</p>
                <p className={s.description}>{"**** **** **** " +props.card}</p>
                <p className={s.balance}>{props.balance+ ".00$"}</p>
            </div>
        </div>
    )
}

export default Profile;