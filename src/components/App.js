import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../context/CurrentUserContext';

import waitingImage from '../images/waiting-for-download.jpeg';
import api from '../utils/Api.js';

function App() {
  // Стейт для попапа редактирования профиля. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  // Для попапа добавления карточки. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  // Стейт для попапа изменения аватала. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // Стейт для попапа отрытия картинки. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [selectedCard, setSelectedCard] = React.useState({});
  // Стейт отвечает за текущего пользователя
  const [currentUser, setСurrentUser] = React.useState({name: '', about: ''});
  // cтейт массива карточек
  const [cards, setCards] = React.useState([]);
  
  // эффект при монтировании, который вызывает загрузку данных пользователя с сервера и обновляет стейт-переменную из полученного значения.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then(jsonUser => {
        setСurrentUser(jsonUser);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // эффект при монтировании, загрузка карточек с сервера и обновляет стейт-переменную из полученного значения.
  React.useEffect(() => {
    api.getInitialCards()
      .then(jsonCard => {
        setCards(jsonCard);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  
  // изменение стейт переменных для открытия попапа
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  // зарос к api на изменение данных профиля
  function handleUpdateUser({name, about}) {
    api.sendUserInfo(name, about)
      .then(json => {
        setСurrentUser(json);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  }

   // зарос к api на изменение аватара
  function handleUpdateAvatar({linkAvatar}) {
    api.changeAvatar(linkAvatar)
      .then(json => {
        setСurrentUser(json);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  }

  // лайк карточки. постановка и снятие. зарос к api
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
    api.addLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.error(err);
    });
    } 
    else {
      api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.error(err);
    });
    }
  }

  // удаление карточки. зарос к api
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter(function (item) {
        return item !== card
      }));
    })
    .catch(err => {
      console.error(err);
    });
  }

  // добавление карточки. запрос к api
  function handleAddPlaceSubmit({nameImage, linkImage}) {
    api.sendNewCard(nameImage, linkImage)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.error(err);
    });
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          и
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <PopupWithForm name="warning" title="Вы уверены?" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
