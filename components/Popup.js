class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListener() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }

      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}

export default Popup;
