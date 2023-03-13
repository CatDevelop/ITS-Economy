import s from "./NavBar.module.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/img/Logo128.png"
import {useAuth} from "../../hooks/use-auth";
import {useDispatch} from "react-redux";
import {removeUser} from "../../store/slices/userSlice";
import {removeProfile} from "../../store/slices/profileSlice";


function NavBar(props) {
    const user = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        debugger
        dispatch(removeProfile());
        dispatch(removeUser());
        navigate("../awd", {replace: true})
    };

    return (
        <header className={s.navbar}>
            <nav className={s.navbarContainer}>
                <Link className={s.homeLink} to="/">
                    <div className={s.navbarLogo}><img src={Logo} alt="Logo"/></div>
                </Link>
                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className={s.navbarLinks}>
                        {
                            (props.type === "port" && user.isAuth) ? <>
                                <li className={s.navbarItem}>
                                    <Link className={s.navbarLink} to={"/profile"}>Profile</Link>
                                </li>

                                <li className={s.navbarItem}>
                                    <Link className={s.navbarLink} to="/transfer">Transfer</Link>
                                </li>
                            </> : <></>
                        }
                    </ul>
                </div>

                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className={s.navbarLinks}>
                        <li className={s.navbarItem}>
                            {
                                !user.isAuth ?
                                    <Link className={s.navbarLink} to="/">Home</Link> :
                                    <Link className={s.navbarLink} onClick={logout}>Logout</Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;