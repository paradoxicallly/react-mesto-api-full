import AuthForm from "./AuthForm";
import { withRouter } from "react-router-dom"

function Register(props) {
    function handleSubmit(email, password) {
        props.onSubmit(email, password)
    }
    return (
        <AuthForm 
            title="Регистрация"
            buttonName="Зарегистрироваться"
            onSubmit={handleSubmit}
        />

    )
}

export default withRouter(Register);