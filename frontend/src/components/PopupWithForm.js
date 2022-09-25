function PopupWithForm(props) {
    let containerClass = `popup popup_type_${props.name}`
    if(props.isOpen) {
        containerClass +=' popup_opened'
    }

    return (
        <div className={containerClass}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button type="button" className={`popup__button-close popup__button-close_type_${props.name}`} onClick={props.onClose}></button>
                <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    <fieldset className="popup__fieldset">
                        {props.children}
                        <button type="submit" className="popup__button">{props.buttonName}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;