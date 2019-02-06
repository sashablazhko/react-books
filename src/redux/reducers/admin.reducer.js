import { Record } from "immutable";

import { adminConstants } from "../../constants/admin.constants";
import { arrToMap } from "../../helpers";
import { AuthorRecord } from "./authors.reducer";

const ReducerState = Record({
  loading: false,
  error: null,
  errorMsg: null,
});

export function admin(state = new ReducerState(), action) {
  const { type } = action;

  switch (type) {
    case adminConstants.API_ADMIN_REQUEST:
      return state.set("loading", true);

    // case adminConstants.UPDATE_AUTHOR_SUCCESS:
    //   return state
    //     .set("loading", false)
    //     .set("error", null)
    //     .update("entities", entities => entities.merge(arrToMap([action.author], "idAuthor", AuthorRecord)));

    case adminConstants.API_ADMIN_FAILURE:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", action.errMsg);

    default:
      return state;
  }
}
