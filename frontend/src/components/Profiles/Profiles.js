import React from 'react';
import s from './Profiles.module.css';
import Profile from "../Profile/Profile";

function Profiles(props) {
    return (
        <div className={s.profiles}>
            <p className={s.title}>User accounts</p>
            {
                props.profiles.map(profile => {
                    return <Profile {...profile}/>
                })
            }
        </div>
    )
}

export default Profiles;