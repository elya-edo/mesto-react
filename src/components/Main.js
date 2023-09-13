import React from 'react';
import waitingImage from '../images/waiting-for-download.jpeg';
import api from '../utils/Api.js';
import Card from './Card.js';

export function Main(props) {

  const [userName, setUserName] = React.useState("Имя...");
  const [userDescription, setUserDescription] = React.useState("Описание профиля...");
  const [userAvatar, setserAvatar] = React.useState(waitingImage);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((json) => {
        setUserName(json.name);
        setUserDescription(json.about);
        setserAvatar(json.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
    api.getInitialCards()
      .then((json) => {
        setCards(json);
        })
      .catch((err) => {
        console.error(err);
        });
  }, [])

  return (
    <main className="content">

      <section className="profile">
        <img className="profile__avatar" src={userAvatar} />
        <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
            <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
      </section>

      <section className="elements">
        {
          cards.map(function (item) { // Берём каждый элемент массива
            return (
              <Card card={item} onCardClick={props.onCardClick} key={item._id}/>
            )
          })
        }
      </section>

    </main>
  );
}

export default Main; 