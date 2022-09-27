import iconError from "../images/icon-error.svg";
import iconSuccess from "../images/icon-success.svg";

function InfoTooltip(props) {
    let containerClass = `popup popup_tooltip`;
    let imgSrc = iconSuccess;
    let titleText = "Вы успешно зарегистрировались!";

    if(props.isOpen) {
        containerClass +=' popup_opened';
    }
    
    if (props.type !== "success") {
        imgSrc = iconError;
        titleText = "Что-то пошло не так! Попробуйте еще раз.";
    }

    return (
        <div className={containerClass}>
            <div className="popup__container popup__container_tooltip">
                <button type="button" className="popup__button-close popup__button-close_tooltip" onClick={props.onClose} />
                <img src={imgSrc} alt="иконка" className="popup__image" />
                <h2 className="popup__title popup__title_tooltip">{titleText}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;