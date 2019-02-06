import Api, { axiosClear } from "./Api";
import Cookies from "universal-cookie";
import { handleResponse } from "../helpers";

const cookies = new Cookies();

export const adminService = {
  updateAuthor,
  addAuthor,
  deleteAuthor,
  uploadBookImg,
  deleteBookImg,
};

function updateAuthor(idAuthor, authorName) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return Api()
    .put(`/admin/updateauthor/${idAuthor}`, {
      authorName: authorName,
    })
    .then(handleResponse);
}

function addAuthor(authorName) {
  return Api().post(`/admin/addauthor`, {
    authorName: authorName,
  });
}

function deleteAuthor(idAuthor) {
  return Api().delete(`/admin/deleteauthor/${idAuthor}`);
}

function uploadBookImg(file, id) {
  // const token = cookies.get("ACCESS_TOKEN");
  // axiosClear().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const data = new FormData();
  data.append("file", file, file.name);
  data.append("id", id);
  let settings = { headers: { "content-type": "multipart/form-data" }, mode: "no-cors" };

  return axiosClear()
    .post("/admin/uploadbookimg", data, settings)
    .then(handleResponse);
}

function deleteBookImg(idBook) {
  return Api()
    .delete(`/admin/deletebookimg/${idBook}`)
    .then(handleResponse);
}
