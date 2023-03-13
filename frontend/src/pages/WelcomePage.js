import {Link} from "react-router-dom";
import s from "../components/NavBar/NavBar.module.css";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";
import {removeProfile} from "../store/slices/profileSlice";
import {removeUsers} from "../store/slices/transferSlice";

export const WelcomePage = () => {
    const user = useAuth();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(removeUser());
        dispatch(removeProfile());
        dispatch(removeUsers());
        navigate("/");
    };

    return (
        <div>
            {!user.isAuth ? <>
                    <Link className={s.navbarLink} to="/registration">Registration</Link>
                    <Link className={s.navbarLink} to="/authorization">Authorization</Link>
                </>: <></>
            }
            {user.isAuth ? <>
                <a className={s.navbarLink} onClick={logout}>Выйти</a>
                </> : <></>
            }
        </div>
    )
}