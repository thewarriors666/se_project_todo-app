import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handFormSubmit;
  }

  _getInputValues() {
    this._popupForm = this._popupElement.querySelector("popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const inputValues = {};
    this._inputList.forEach((input) => {
      //add a key/value pair to the values object for each input
      //the key is input.name
      //value is input.value
      //need to use bracket notation not .
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues;

      // pass results of _getInputValues to submission handler
      this._handleFormSubmit(evt);
    });
  }
}

export default PopupWithForm;
