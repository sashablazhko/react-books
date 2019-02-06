import { OrderedMap, Record } from "immutable";

import { authorsConstants } from "../../constants/authors.constants";
import { adminConstants } from "../../constants/admin.constants";
import { arrToMap } from "../../helpers";

export const AuthorRecord = Record({
  idAuthor: null,
  authorName: null,
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  listLoaded: false,
  error: null,
  errorMsg: null,
});

export function authors(state = new ReducerState(), action) {
  const { type } = action;

  switch (type) {
    case authorsConstants.LOAD_ALL_AUTHORS_REQUEST:
    case authorsConstants.LOAD_AUTHOR_REQUEST:
    case adminConstants.UPDATE_AUTHOR_REQUEST:
      return state.set("loading", true);

    case authorsConstants.LOAD_ALL_AUTHORS_SUCCESS:
      return state
        .set("loading", false)
        .set("listLoaded", true)
        .set("error", null)
        .update("entities", entities => arrToMap(action.authors, "idAuthor", AuthorRecord).merge(entities));

    case authorsConstants.LOAD_AUTHOR_SUCCESS:
    case adminConstants.UPDATE_AUTHOR_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => entities.merge(arrToMap([action.author], "idAuthor", AuthorRecord)));

    case authorsConstants.LOAD_ALL_AUTHORS_FAILURE:
    case authorsConstants.LOAD_AUTHOR_FAILURE:
    case adminConstants.UPDATE_AUTHOR_FAILURE:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", action.errMsg);

    default:
      return state;
  }
}
