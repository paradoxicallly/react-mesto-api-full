import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CardDeleteConfirmPopup from "./CardDeleteConfirmPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsListContext } from "../contexts/CardsListContext";
import { api } from "../utils/Api";

function App() {   
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
    const [isCardDeleteConfirmPopupOpen, setCardDeleteConfirmPopupOpen] = React.useState(false)
    
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cardId, setCardId ] = React.useState()

    const [currentUser, setCurrentUser] = React.useState({});
    const [cardsList, setCardsList] = React.useState([]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(like => like._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCardsList((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardDelete() {
        api.removeCard(cardId)
        .then(() =>{
            setCardsList((state) => state.filter((card) => card._id !== cardId))
            closeAllPopups()
        }
        )
        .catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit(cardName, link) {
        api.addCard(cardName, link)
        .then(res => {
            setCardsList([res, ...cardsList])
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardDeleteConfirm(id) {
        setCardDeleteConfirmPopupOpen(true);
        setCardId(id)
    }

    function handleCardClick(value) {
        setSelectedCard(value);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setCardDeleteConfirmPopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(userName, userAbout) {
        api.setUserInfo(userName, userAbout)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCardsList(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">        
            <Header />
            
            <CardsListContext.Provider value={[cardsList, setCardsList]}>
                <Main 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardDeleteConfirm={handleCardDeleteConfirm}
                    onCardClick={handleCardClick}
                    cards={cardsList}
                    onCardLike={handleCardLike}
                />
            </CardsListContext.Provider>

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <CardDeleteConfirmPopup isOpen={isCardDeleteConfirmPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete}  />

            <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
            />    
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
