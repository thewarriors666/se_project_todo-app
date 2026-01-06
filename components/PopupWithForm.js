import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handFormSubmit;
  }

  _getInputValues() {
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const getInputValues = this._getInputValues;

      this._handleFormSubmit(evt);
    });
  }
}

export default PopupWithForm;
