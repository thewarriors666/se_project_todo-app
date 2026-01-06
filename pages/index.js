import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addTodopopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handFormSubmit: (inputValues) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const item = { name, date, id };
    renderTodo(item);
    addTodopopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodopopup.setEventListener();

const section = new Section({
  items: [],
  renderer: (item) => {
    const el = generateTodo(item);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleTotal(updateCompleted, increment) {
  todoCounter.updateTotal(increment);
  if (updateCompleted) {
    todoCounter.updateCompleted(increment);
  }
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
  section.addItem(el);
};

addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  addTodopopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const item = { name, date, id };
  renderTodo(item);
  addTodopopup.close();
  newTodoValidator.resetValidation();
  initialTodos.forEach((item) => {
    renderTodo(item);
  });
});
