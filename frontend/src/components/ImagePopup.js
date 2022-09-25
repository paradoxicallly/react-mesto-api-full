function ImagePopup(props) {
    let containerClass = `popup popup_picture-full`
    if(Object.keys(props.card).length > 0) {
        containerClass +=' popup_opened'
    }

    return(
        <div className={containerClass}>
            <div className="popup__container popup__container_picture-full">
                <button type="button" className="popup__button-close popup__button-close_picture-full" onClick={props.onClose}></button>
                <img className="popup__full-picture" src={props.card.link} alt={props.card.name} />
                <h2 className="popup__picture-title">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;