import PopupWithForm from "./PopupWithForm";

function CardDeleteConfirmPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard();
    }

    return (
        <PopupWithForm 
            name="delete-card" 
            title="Вы уверены?" 
            buttonName="Да" 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default CardDeleteConfirmPopup;