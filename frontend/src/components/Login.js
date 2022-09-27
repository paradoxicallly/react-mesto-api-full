import AuthForm from "./AuthForm";
import { withRouter } from "react-router-dom"

function Login(props) {
    function handleSubmit(email, password) {
        props.onSubmit(email, password)
    } 

    return (
        <AuthForm 
            title="Вход"
            buttonName="Войти"
            onSubmit={handleSubmit}
        />

    )
}

export default withRouter(Login);