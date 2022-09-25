import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
                name="change-avatar"
                title="Обновить аватар"
                buttonName="Сохранить"
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={handleSubmit}
            >
                <label className="popup__field">
                    <input 
                        type="url" 
                        name="avatar-link" 
                        id="avatar-link-input"
                        placeholder="Ссылка на изображение" 
                        className="popup__input popup__input_type_avatar-link" 
                        required
                        ref={avatarRef}
                    />
                    <span className='popup__input-error' id='avatar-link-input_type_error'></span>
                </label>
            </PopupWithForm>
    )
}

export default EditAvatarPopup;