import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser(
          name,
          description,
        );
      }
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            buttonName="Сохранить" 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            >
            <label className="popup__field">
                    <input 
                        type="text"                         
                        className="popup__input popup__input_type_name"
                        name="profile-name"
                        id="name-input"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        required
                        value={name || ''}
                        onChange={handleNameChange}
                    />
                    <span className='popup__input-error' id='name-input_type_error'></span>
                </label>
                <label className="popup__field">
                    <input 
                        type="text"
                        className="popup__input popup__input_type_job"
                        name="profile-job"
                        id="job-input" 
                        placeholder="О себе"
                        minLength="2"
                        maxLength="200"
                        required
                        value={description || ''}
                        onChange={handleDescriptionChange}
                    />
                    <span className='popup__input-error' id='job-input_type_error'></span>
                </label>
            </PopupWithForm>
    )
}

export default EditProfilePopup;