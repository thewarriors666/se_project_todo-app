class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(_formEl, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      this._hideInputError(this._formEl, inputElement);
    }
  }

  _setEventListeners(settings) {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState = (_inputList, buttonElement) => {
      if (this._hasInvalidInput(_inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };

    this._inputList.forEach((inputElement, _formEl) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(_formEl, inputElement, settings);
        this._toggleButtonState(this._inputList, buttonElement, settings);
      });
    });
  }

  _showInputError = (_formEl, inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (_formEl, inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (_inputList) => {
    return _inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation(settings) {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(settings);
  }

  resetValidation(_formEl, buttonElement, settings) {
    this._inputList.forEach((input) => {
      this._hideInputError(this._formEl, input);
      this._toggleButtonState(this._inputList, buttonElement, settings);
    });
  }
}

export default FormValidator;
