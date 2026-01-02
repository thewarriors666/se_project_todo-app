class Section {
  constructor({ items, renderer, containerSelector }) {
    this._item = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this.renderItems();
    //refactor todosList.append with this
  }
}

export default Section;
