import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodopopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodopopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodopopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(".counter__text");

const addTodopopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handFormSubmit: (inputValues) => {},
  // move code from existing submission handler to here
});
addTodopopup.addEventListener();

const section = new Section({
  items: [],
  renderer: (item) => {
    const el = generateTodo(item);
    renderItems.append(el);
  },
  containerSelector: ".todos__list",
});

renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleTotal(completed) {
  todoCounter.updateTotal(true);
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleTotal
  );
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodo = (item) => {
  const el = generateTodo(item);
  addItem.append(el);
};

function _handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    this.close();
  }
}

addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  addTodopopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const item = { name, date, id };
//   renderTodo(item);
//   addTodopopup.close();
//   newTodoValidator.resetValidation();
// });

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
