import React from "react";
import { Link, useLocation } from "react-router-dom";

function AuthForm(props) {
    const location = useLocation();

    const emailRef = React.useRef();
    const passwordRef = React.useRef();

function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(emailRef.current.value, passwordRef.current.value)
}

    return (
        <div className="auth">
            <h1 className="auth__title">{props.title}</h1>
            <form className="auth__form" onSubmit={handleSubmit}> 
                <fieldset className="auth__fieldset">
                    <label className="auth__field">
                        <input
                            type="email"
                            className="auth__input auth__input_type_email"
                            name="auth-email"
                            id="email-input"
                            placeholder="Email"
                            ref={emailRef}
                            required
                        />
                    </label>
                    <label className="auth__field">
                        <input
                            type="password"
                            className="auth__input auth__input_type_password"
                            name="auth-password"
                            id="password-input"
                            placeholder="Пароль"
                            ref={passwordRef}
                            required
                        />
                    </label>
                    <button type="submit" className="auth__button">{props.buttonName}</button>
                </fieldset>
                {location.pathname === "/sign-up" && (
                    <Link className="auth__link" to="/sign-in"><p className="auth__link-text">Уже зарегистрированы? Войти</p></Link>
                )}
            </form>
        </div>
    )
}

export default AuthForm;