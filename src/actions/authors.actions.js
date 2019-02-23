import { toast } from "react-toastify";
import { authorsConstants } from "../constants/authors.constants";
import { authorsService } from "../services/AuthorsService";

export function loadAllAuthors() {
  return dispatch => {
    dispatch(_request());

    authorsService.getAuthors().then(
      authors => {
        dispatch(_success(authors));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };

  function _success(authors) {
    return { type: authorsConstants.LOAD_ALL_AUTHORS_SUCCESS, authors };
  }
  function _request() {
    return { type: authorsConstants.LOAD_ALL_AUTHORS_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authorsConstants.LOAD_ALL_AUTHORS_FAILURE, errMsg };
  }
}

export function loadAuthor(id) {
  return (dispatch, getState) => {
    dispatch(_request());

    authorsService.getAuthor(id).then(
      author => {
        dispatch(_success(author));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };

  function _success(author) {
    return { type: authorsConstants.LOAD_AUTHOR_SUCCESS, author };
  }
  function _request() {
    return { type: authorsConstants.LOAD_AUTHOR_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authorsConstants.LOAD_AUTHOR_FAILURE, errMsg };
  }
}
