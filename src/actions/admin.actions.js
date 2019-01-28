import { toast } from "react-toastify";
import Cookies from "universal-cookie";
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
}

function _request() {
  return { type: adminConstants.API_ADMIN_REQUEST };
}
function _failure(errMsg) {
  return { type: adminConstants.API_ADMIN_FAILURE, errMsg };
}
