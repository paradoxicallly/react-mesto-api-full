import React from "react";
import avatarChange from "../images/change-avatar.svg"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img className="profile__avatar"  src={currentUser.avatar} alt="аватар"/>
                        <img className="profile__avatar-change" src={avatarChange} alt="аватар"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" onClick={props.onEditProfile} className="profile__button-edit" />
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>                
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__button-add" />
            </section>

            <section className="elements">
                <ul className="cards">
                    { props.cards.map(card => (
                        <Card 
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            card={card}
                            key={card._id}
                            onCardDeleteConfirm={props.onCardDeleteConfirm}
                        />
                    )) }
                </ul>            
            </section>
        </main>
    )
}

export default Main;