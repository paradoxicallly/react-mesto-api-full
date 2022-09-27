import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(name, link)
    }

    React.useEffect(() => {
        if (!props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen])

    return (
        <PopupWithForm 
                name="add-picture"
                title="Новое место"
                buttonName={props.isLoading? 'Создание...' : 'Создать'}
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
                        value={name || ''}
                        onChange={handleNameChange}
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
                        value={link || ''}
                        onChange={handleLinkChange}
                    />
                    <span className='popup__input-error' id='link-input_type_error'></span>
                </label>
            </PopupWithForm>
    )
}

export default AddPlacePopup;