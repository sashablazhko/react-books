import { toast } from "react-toastify";
import { push } from "connected-react-router";
import { adminConstants } from "../constants/admin.constants";
import { adminService } from "../services/AdminService";

export function addAuthor(authorName) {
  return dispatch => {
    dispatch(_request());

    adminService.addAuthor(authorName).then(
      author => {
        dispatch(_success(author));
        dispatch(push("/admin/authors"));
      },
      err => {
        dispatch(_failure(err));
        toast.error(err);
      }
    );
  };

  function _success(author) {
    return { type: adminConstants.ADD_AUTHOR_SUCCESS, author };
  }
  function _request() {
    return { type: adminConstants.ADD_AUTHOR_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.ADD_AUTHOR_FAILURE, errMsg };
  }
}

export function updateAuthor(id, authorName) {
  return dispatch => {
    dispatch(_request());

    adminService.updateAuthor(id, authorName).then(
      author => {
        dispatch(_success(author));
        dispatch(push("/admin/authors"));
      },
      err => {
        dispatch(_failure(err));
        toast.error(err);
      }
    );
  };

  function _success(author) {
    return { type: adminConstants.UPDATE_AUTHOR_SUCCESS, author };
  }
  function _request() {
    return { type: adminConstants.UPDATE_AUTHOR_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.UPDATE_AUTHOR_FAILURE, errMsg };
  }
}

export function uploadBookImg(file, idBook) {
  return dispatch => {
    dispatch(_request());

    adminService.uploadBookImg(file, idBook).then(
      imgName => {
        dispatch(_success(imgName, idBook));
      },
      err => {
        dispatch(_failure(err));
        toast.error(err);
      }
    );
  };

  function _success(imgName, idBook) {
    return { type: adminConstants.UPLOAD_BOOKIMG_SUCCESS, imgName, idBook };
  }
  function _request() {
    return { type: adminConstants.UPLOAD_BOOKIMG_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.UPLOAD_BOOKIMG_FAILURE, errMsg };
  }
}

export function deleteBookImg(idBook) {
  return dispatch => {
    dispatch(_request());

    adminService.deleteBookImg(idBook).then(
      imgName => {
        dispatch(_success(imgName, idBook));
      },
      err => {
        dispatch(_failure(err));
        toast.error(err);
      }
    );
  };

  function _success(imgName, idBook) {
    return { type: adminConstants.DELETE_BOOKIMG_SUCCESS, imgName, idBook };
  }
  function _request() {
    return { type: adminConstants.DELETE_BOOKIMG_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.DELETE_BOOKIMG_FAILURE, errMsg };
  }
}

export function updateBook(id, book) {
  return dispatch => {
    dispatch(_request());

    adminService.updateBook(id, book).then(
      book => {
        dispatch(_success(book));
        dispatch(push("/admin/books"));
      },
      err => {
        dispatch(_failure(err));
        toast.error(err);
      }
    );
  };

  function _success(book) {
    return { type: adminConstants.UPDATE_BOOK_SUCCESS, book };
  }
  function _request() {
    return { type: adminConstants.UPDATE_BOOK_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.UPDATE_BOOK_FAILURE, errMsg };
  }
}

export function updateChapter(idBook, idChapter, chapter) {
  return dispatch => {
    dispatch(_request());

    console.log("idBook, idChapter, chapter", idBook, idChapter, chapter);
    // adminService.updateBook(id, book).then(
    //   book => {
    //     dispatch(_success(book));
    //     dispatch(push("/admin/books"));
    //   },
    //   err => {
    //     dispatch(_failure(err));
    //     toast.error(err);
    //   }
    // );
  };

  function _success(book) {
    return { type: adminConstants.UPDATE_CHAPTER_SUCCESS, book };
  }
  function _request() {
    return { type: adminConstants.UPDATE_CHAPTER_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: adminConstants.UPDATE_CHAPTER_FAILURE, errMsg };
  }
}
