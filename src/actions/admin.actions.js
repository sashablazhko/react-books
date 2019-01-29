import { toast } from "react-toastify";
import { push } from "connected-react-router";
import { adminConstants } from "../constants/admin.constants";
import { adminService } from "../services/AdminService";

export function updateAuthor(id, author_name) {
  return async dispatch => {
    dispatch(_request());

    adminService.updateAuthor(id, author_name).then(
      author => {
        console.log("author", author);
        dispatch(_success(author));
        dispatch(push("/admin/authors"));
      },
      err => {
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
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
