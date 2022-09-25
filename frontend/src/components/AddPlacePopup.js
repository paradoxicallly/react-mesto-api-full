import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(nameRef.current.value, linkRef.current.value)
    }

    React.useEffect(() => {
        if (!props.isOpen) {
            nameRef.current.value = '';
            linkRef.current.value = '';
        }
    })

    return (
        <PopupWithForm 
                name="add-picture"
                title="Новое место"
                buttonName="Создать"
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={handleSubmit}
            >
                <label className="popup__field">
                    <input 
                        type="text" 
                        name="image-title" 
                        id="title-input"
                        placeholder="Название" 
                        className="popup__input popup__input_type_title" 
                        minLength="2" 
                        maxLength="30" 
                        required
                        ref={nameRef}
                    />
                    <span className='popup__input-error' id='title-input_type_error'></span>
                </label>
                <label className="popup__field">
                    <input 
                        type="url" 
                        name="image-link" 
                        id="link-input"
                        placeholder="Ссылка на картинку" 
                        className="popup__input popup__input_type_link" 
                        required
                        ref={linkRef}
                    />
                    <span className='popup__input-error' id='link-input_type_error'></span>
                </label>
            </PopupWithForm>
    )
}

export default AddPlacePopup;