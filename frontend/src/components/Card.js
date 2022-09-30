import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleDelete() {
        props.onCardDeleteConfirm(props.card._id);
    }

    const isOwn = () => {
        const current = currentUser._id || currentUser
        const owner = props.card.owner._id || props.card.owner
        return current === owner
    }
    const cardDeleteButtonClassName = (
        `cards__button-delete ${isOwn() ? false : 'cards__button-delete_hidden'}`
    );

    const isLiked = props.card.likes.includes(currentUser._id) || props.card.likes.includes(currentUser)
    const cardLikeButtonClassName = (
        `cards__button-like ${isLiked ? 'cards__button-like_active' : false}`
    )

    return(
        <li className="cards__item">
            <img className="cards__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDelete} />
            <div className="cards__name">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="cards__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLike} />
                    <p className="cards__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </li> 
    )
}

export default Card;