const store = {
  setLocalStorage(book) {
    localStorage.setItem("book", JSON.stringify(book));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("book"));
  },
};

export default store;
