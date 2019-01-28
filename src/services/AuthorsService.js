import Api from "./Api";

import { handleResponse } from "../helpers";

export const authorsService = {
  getAuthors,
  getAuthor,
};

function getAuthors() {
  return Api()
    .get("/authors")
    .then(handleResponse);
}

function getAuthor(authorId) {
  return Api()
    .get(`/authors/${authorId}`)
    .then(handleResponse);
}
