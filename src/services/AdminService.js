import Api from "./Api";

export default {
  updateAuthor(idAuthor, authorName) {
    return Api().put(`/admin/updateauthor/${idAuthor}`, {
      author_name: authorName,
    });
  },
  addAuthor(authorName) {
    return Api().post(`/admin/addauthor`, {
      author_name: authorName,
    });
  },
  deleteAuthor(idAuthor) {
    return Api().delete(`/admin/deleteauthor/${idAuthor}`);
  },
};
