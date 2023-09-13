import React from 'react';
import waitingImage from '../images/waiting-for-download.jpeg';


export function ImagePopup(props) {

  return (
    <div className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_image">
          <img className="popup__picture" src={props.card.link} />
          <h2 className="popup__picture-title"></h2>
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
        </div>
      </div>
  );
}

export default ImagePopup; 