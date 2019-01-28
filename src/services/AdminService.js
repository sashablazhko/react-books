import Api from "./Api";
import Cookies from "universal-cookie";
import { handleResponse } from "../helpers";

const cookies = new Cookies();

export const adminService = {
  updateAuthor,
  addAuthor,
  deleteAuthor,
};

function updateAuthor(idAuthor, authorName) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return Api()
    .put(`/admin/updateauthor/${idAuthor}`, {
      author_name: authorName,
    })
    .then(handleResponse);
}

function addAuthor(authorName) {
  return Api().post(`/admin/addauthor`, {
    author_name: authorName,
  });
}

function deleteAuthor(idAuthor) {
  return Api().delete(`/admin/deleteauthor/${idAuthor}`);
}
