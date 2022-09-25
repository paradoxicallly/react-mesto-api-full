// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const profileElement = popupProfile.querySelector('.popup__form_profile');
const nameInput = profileElement.querySelector('.popup__input_type_name');
const jobInput = profileElement.querySelector('.popup__input_type_job');

// переменные профиля
const profileOpenButton = document.querySelector('.profile__button-edit');
const dataFromPage = {
    profileName: '.profile__title',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar'
}

// переменные формы картинок
const popupPictureForm = document.querySelector('.popup_picture-form');
const pictureFormOpenButton = document.querySelector('.profile__button-add');

// переменные формы аватарки
const avatarChangeForm = document.querySelector('.popup__form_change-avatar');

export { 
    popupProfile,
    nameInput,
    jobInput,
    profileOpenButton,
    dataFromPage,
    popupPictureForm,
    pictureFormOpenButton,
    avatarChangeForm
}