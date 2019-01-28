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
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
      }
    );
  };

  function _success(authors) {
    return { type: authorsConstants.LOAD_ALL_AUTHORS_SUCCESS, authors };
  }
}

export function loadAuthor(id) {
  return (dispatch, getState) => {
    dispatch(_request());

    authorsService.getAuthor(id).then(
      author => {
        console.log("author", author);
        dispatch(_success(author));
      },
      err => {
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
      }
    );
  };

  function _success(author) {
    return { type: authorsConstants.LOAD_AUTHOR_SUCCESS, author };
  }
}

function _request() {
  return { type: authorsConstants.API_AUTHORS_REQUEST };
}
function _failure(errMsg) {
  return { type: authorsConstants.API_AUTHORS_FAILURE, errMsg };
}
