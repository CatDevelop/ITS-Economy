import React from 'react';
import s from './Card.module.css';
import {Link} from "react-router-dom";
import CardLogo from "../../assets/img/CardLogo.png";

function Card(props) {
    return (
        <div className={s.cardContainer}>
            <div className={s.card}>
                <div className={s.balanceContainer}>
                    <p className={s.balanceTitle}>Current balance</p>
                    <p className={s.balanceNumber}>{"$"+props.balance+".00"}</p>
                </div>

                <div className={s.nameContainer}>
                    <p className={s.cardholderName}>{props.cardholderName}</p>
                    <p className={s.cardholderCard}>{"**** **** **** "+props.cardholderCard}</p>
                </div>

                <div className={s.dateContainer}>
                    <p className={s.cardDate}>04/23</p>
                </div>

                <div className={s.logoContainer}>
                    <img className={s.cardLogo} src={CardLogo} alt=""/>
                    <p className={s.cardLogoTitle}>IT-school Banking</p>
                </div>
            </div>
        </div>
    )
}

export default Card;