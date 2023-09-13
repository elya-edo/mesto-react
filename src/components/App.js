import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  //Для попапа редактирования профиля. Хук, управляющий внутренним состоянием.
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  // Для попапа добавления карточки. Хук, управляющий внутренним состоянием.
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  
  // Для попапа изменения аватала. Хук, управляющий внутренним состоянием.
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Для попапа отрытия картинки. Хук, управляющий внутренним состоянием.
  const [selectedCard, setSelectedCard] = React.useState(false);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">

      <Header />

      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} и onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>

      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input className="popup__input popup__input_first" id="input-nameProfile" type="text" placeholder="Имя" name="name-profile" minLength="2" maxLength="40" required/>
        <span className="popup__errorMessage input-nameProfile-error"></span>
        <input className="popup__input" id="input-descriptionProfile" type="text" placeholder="О себе" name="description-profile" minLength="2" maxLength="200" required/>
        <span className="popup__errorMessage input-descriptionProfile-error"></span>
      </PopupWithForm>

      <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
        <input className="popup__input popup__input_first" id="input-nameImage" type="text" placeholder="Название" name="name-place" minLength="2" maxLength="30" required/>
        <span className="popup__errorMessage input-nameImage-error">Вы пропустили это поле</span>
        <input className="popup__input" id="input-linkImage" type="url" placeholder="Ссылка на картинку" name="link-picture" required/>
        <span className="popup__errorMessage input-linkImage-error">Введите адрес сайта</span>
      </PopupWithForm>

      <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input className="popup__input popup__input_first" id="input-updateAvatar" type="url" placeholder="Ссылка на изображение" name="update-avatar" required/>
        <span className="popup__errorMessage input-updateAvatar-error">Введите адрес сайта</span>
      </PopupWithForm>

      <PopupWithForm name="warning" title="Вы уверены?" buttonText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
