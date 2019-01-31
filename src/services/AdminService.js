import Api, { axiosClear } from "./Api";
import Cookies from "universal-cookie";
import { handleResponse } from "../helpers";

const cookies = new Cookies();

export const adminService = {
  updateAuthor,
  addAuthor,
  deleteAuthor,
  uploadBookImg,
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

function uploadBookImg(file, id) {
  // const token = cookies.get("ACCESS_TOKEN");
  // axiosClear().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // const data = new FormData();
  // data.append("file", file, file.name);
  // let settings = { headers: { "content-type": "multipart/form-data" }, mode: "cors" };

  // axiosClear()
  //   .post("/admin/uploadbookimg", data, settings)
  //   .then(data => console.log("data", data), err => console.log("err", err));
  const data = new FormData();
  data.append("file", file, file.name);
  data.append("id", id);
  console.log("id", id);
  window
    .fetch("http://laravel-books/api/admin/uploadbookimg", {
      method: "POST",
      mode: "no-cors",
      body: data,
    })
    .then(data => console.log("data", data), err => console.log("err", err));
}
