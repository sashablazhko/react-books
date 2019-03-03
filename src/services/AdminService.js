import Api, { axiosClear } from "./Api";
import Cookies from "universal-cookie";
import { handleResponse } from "../helpers";

const cookies = new Cookies();

export const adminService = {
  addAuthor,
  updateAuthor,
  deleteAuthor,

  uploadBookImg,
  deleteBookImg,
  uploadImgWithoutBook,

  addBook,
  updateBook,

  addChapter,
  updateChapter,
};

function addAuthor(authorName) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return Api()
    .post(`/admin/addauthor`, {
      authorName,
    })
    .then(handleResponse);
}

function updateAuthor(idAuthor, authorName) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return Api()
    .put(`/admin/updateauthor/${idAuthor}`, {
      authorName,
    })
    .then(handleResponse);
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

function uploadImgWithoutBook(file) {
  // const token = cookies.get("ACCESS_TOKEN");
  // axiosClear().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const data = new FormData();
  data.append("file", file, file.name);
  let settings = { headers: { "content-type": "multipart/form-data" }, mode: "no-cors" };

  return axiosClear()
    .post("/admin/uploadimgwithoutbook", data, settings)
    .then(handleResponse);
}

function addBook(book) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { bookName, authorId, bookImg, bookDescription } = book;
  return Api()
    .post("/admin/addbook", {
      bookName,
      authorId,
      bookImg,
      bookDescription,
    })
    .then(handleResponse);
}

function updateBook(idBook, book) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { bookName, authorId, bookImg, bookDescription } = book;
  return Api()
    .put(`/admin/updatebook/${idBook}`, {
      bookName,
      authorId,
      bookImg,
      bookDescription,
    })
    .then(handleResponse);
}

function addChapter(bookId, chapter) {
  console.log("bookId, chapter", bookId, chapter);
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { chapterName, chapterContent } = chapter;
  return Api()
    .post(`/admin/addchapter`, {
      bookId,
      chapterName,
      chapterContent,
    })
    .then(handleResponse);
}

function updateChapter(idChapter, chapter) {
  const token = cookies.get("ACCESS_TOKEN");
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { chapterName, chapterContent } = chapter;
  return Api()
    .put(`/admin/updatechapter/${idChapter}`, {
      chapterName,
      chapterContent,
    })
    .then(handleResponse);
}
