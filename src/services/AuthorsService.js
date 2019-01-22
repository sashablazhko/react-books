import Api from "./Api";

export default {
  getAuthors() {
    return Api().get("/authors");
  },
  getAuthor(authorId) {
    return Api().get(`/authors/${authorId}`);
  },
};
