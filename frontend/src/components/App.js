import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CardDeleteConfirmPopup from "./CardDeleteConfirmPopup";
import Login from './Login';
import Register from './Register';
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsListContext } from "../contexts/CardsListContext";
import { api } from "../utils/Api";
import { register, checkTokenValidity, authorize } from "../utils/Auth";

function App(props) {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isCardDeleteConfirmPopupOpen, setIsCardDeleteConfirmPopupOpen] = React.useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(true)
    
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cardId, setCardId ] = React.useState()

    const [currentUser, setCurrentUser] = React.useState({});
    const [currentUserMail, setCurrentUserMail] = React.useState("")
    const [cardsList, setCardsList] = React.useState([]);

    const [infoTooltipType, setinfoTooltipType] = React.useState('')

    const [isLoading, setIsLoading] = React.useState(false);

    const history = useHistory();

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

    function handleCardLike(card) {
        const isLiked = card.likes.includes(currentUser._id) || card.likes.includes(currentUser)
        
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCardsList((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardDelete() {
        setIsLoading(true);
        api.removeCard(cardId)
        .then(() =>{
            setCardsList((state) => state.filter((card) => card._id !== cardId))
            closeAllPopups()
        }
        )
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(cardName, link) {
        setIsLoading(true);
        api.addCard(cardName, link)
        .then(res => {
            setCardsList([res.data, ...cardsList])
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setIsLoading(false))
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardDeleteConfirm(id) {
        setIsCardDeleteConfirmPopupOpen(true);
        setCardId(id)
    }

    function handleCardClick(value) {
        setSelectedCard(value);
    }

    function handleInfoTooltipClick() {
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsCardDeleteConfirmPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(userName, userAbout) {
        setIsLoading(true);
        api.setUserInfo(userName, userAbout)
        .then(res => {
            setCurrentUser(res.user)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true);
        api.changeAvatar(avatar)
        .then(res => {
            setCurrentUser(res.user)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setIsLoading(false))
    }

    function handleLogin(email, password) {
        authorize(email, password)
        .then(res => {
            if (res.token) {
                localStorage.setItem("token", res.token)
            }
            setLoggedIn(true)
            setCurrentUserMail(email)
            this.history.push("/")
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })
        .catch((err) => {
            setinfoTooltipType("error")
            handleInfoTooltipClick()
            console.log(err);
        })
    }

    function handleRegistration(email, password) {
        register(email, password)
        .then(res => {
            this.history.push("/sign-in")
            setinfoTooltipType("success")
        })
        .catch((err) => {
            setinfoTooltipType("error")
            console.log(err);
        })
        .finally(() => handleInfoTooltipClick())
    }

    function handleLogOut() {
        setLoggedIn(false);
        localStorage.removeItem("token")
    }


    React.useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            handleLogOut()
        } else {
            checkTokenValidity(token)
            .then(res => {
                setLoggedIn(true);
                setCurrentUserMail(res.email)
            })
            .catch(err => {
                console.log(err)
                handleLogOut()
            })
        }
    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn])

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCardsList(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn])

    React.useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            closeAllPopups();
          }
        }
        if(isOpen) {
          document.addEventListener('keydown', closeByEscape);
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
        }
    }, [isOpen]) 

  return (
    <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">        
                <Header userMail={currentUserMail} logOut={handleLogOut} />

                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                    >                
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
                    </ProtectedRoute>

                    <Route
                        path="/sign-in"
                    >
                        <Login onSubmit={handleLogin} />
                    </Route>

                    <Route
                        path="/sign-up"
                    >
                        <Register onSubmit={handleRegistration}  />
                    </Route>

                </Switch>

                <Footer />

                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser} 
                    isLoading={isLoading}
                />

                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups} 
                    onAddPlace={handleAddPlaceSubmit} 
                    isLoading={isLoading}
                />

                <EditAvatarPopup 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateAvatar={handleUpdateAvatar} 
                    isLoading={isLoading}
                />

                <CardDeleteConfirmPopup 
                    isOpen={isCardDeleteConfirmPopupOpen} 
                    onClose={closeAllPopups} 
                    onDeleteCard={handleCardDelete}  
                    isLoading={isLoading}
                />

                <InfoTooltip 
                    isOpen={isInfoTooltipOpen} 
                    onClose={closeAllPopups} 
                    type={infoTooltipType}
                />

                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                />    
            </div>
        </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
