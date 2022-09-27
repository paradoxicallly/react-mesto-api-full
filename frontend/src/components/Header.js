import { useLocation, Link, withRouter } from 'react-router-dom';
import logo from '../logo.svg';

function Header(props) {
    const location = useLocation();

    return (
        <div className="header">
            <img className="header__logo" src={logo} alt="логотип"/>

            {location.pathname === "/sign-up" && (
                <Link className="header__link" to="/sign-in">Войти</Link>
            )}

            {location.pathname === "/sign-in" && (
                <Link className="header__link" to="/sign-up">Регистрация</Link>
            )}

            {location.pathname === "/" && (
                <div className="header__user-info">
                    <p className="header__username">{props.userMail}</p>
                    <p className="header__link header__link_logout" onClick={props.logOut}>Выйти</p>
                </div>
            )}
        </div>
    )
}

export default withRouter(Header);
