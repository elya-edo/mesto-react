import React from 'react';

export function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="elements__element" onClick={handleClick}>
      <button className="elements__delite-button" type="button" aria-label="Удалить карточку"></button>
      <img className="elements__image" src={props.card.link} alt={props.card.name}/>
      <div className="elements__description">
        <h2 className="elements__title">{props.card.name}</h2>
        <div>
          <button className="elements__like-button" type="button" aria-label="Поставить лайк"></button>
          <p className="elements__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card; 