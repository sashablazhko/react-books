import Api from "./Api";

export default {
  getBooks() {
    return Api().get("/books");
  },

  getBook(bookId) {
    return Api().get(`/books/${bookId}`);
  },

  getChapterText(bookId, chapterId) {
    return Api().get(`/books/${bookId}/${chapterId}`);
  },
};
