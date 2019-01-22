import { OrderedMap, Record } from "immutable";
import Authors from "../services/AuthorsService";
import { arrToMap } from "../helpers";
import { toast } from "react-toastify";
import Api from "../services/Api";
import Cookies from "universal-cookie";
import { push } from "connected-react-router";

const cookies = new Cookies();

const AuthorRecord = Record({
  id_author: null,
  author_name: null,
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  listLoaded: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "authors";
export const API_AUTHORS_REQUEST = `${moduleName}/API_AUTHORS_REQUEST`;
export const API_AUTHORS_ERROR = `${moduleName}/API_AUTHORS_ERROR`;
export const LOAD_ALL_AUTHORS_SUCCESS = `${moduleName}/LOAD_ALL_AUTHORS_SUCCESS`;
export const LOAD_AUTHOR_SUCCESS = `${moduleName}/LOAD_AUTHOR_SUCCESS`;
export const UPDATE_AUTHOR_SUCCESS = `${moduleName}/UPDATE_AUTHOR_SUCCESS`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case API_AUTHORS_REQUEST:
      return state.set("loading", true);

    case LOAD_ALL_AUTHORS_SUCCESS:
      return state
        .set("loading", false)
        .set("listLoaded", true)
        .set("error", null)
        .update("entities", entities => arrToMap(payload.authors, "id_author", AuthorRecord).merge(entities));

    case LOAD_AUTHOR_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => entities.merge(arrToMap([payload.author], "id_author", AuthorRecord)));

    case UPDATE_AUTHOR_SUCCESS:
      return state.set("loading", false).set("error", null);

    case API_AUTHORS_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", payload.errMsg);

    default:
      return state;
  }
}

export function loadAllAuthors() {
  return async dispatch => {
    dispatch({
      type: API_AUTHORS_REQUEST,
    });

    try {
      const res = await Authors.getAuthors();
      dispatch({
        type: LOAD_ALL_AUTHORS_SUCCESS,
        payload: {
          authors: res.data,
        },
      });
    } catch (err) {
      console.log("LOAD ALL AUTHORS ERR", err);
      dispatch({
        type: API_AUTHORS_ERROR,
        payload: {
          errMsg: err.message,
        },
      });
      toast.error(err.message);
    }
  };
}

export function loadAuthor(id) {
  return async dispatch => {
    dispatch({
      type: API_AUTHORS_REQUEST,
    });

    try {
      const res = await Authors.getAuthor(id);
      dispatch({
        type: LOAD_AUTHOR_SUCCESS,
        payload: {
          author: res.data,
        },
      });
    } catch (err) {
      console.log("LOAD BOOK ERR", err);
      dispatch({
        type: API_AUTHORS_ERROR,
        payload: {
          errMsg: err,
        },
      });
      // toast.error(err.response.data.error);
    }
  };
}

export function updateAuthor(id, author_name) {
  return async dispatch => {
    dispatch({
      type: API_AUTHORS_REQUEST,
    });

    const token = cookies.get("ACCESS_TOKEN");
    Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const {
        status,
        data: { author },
      } = await Api().put(`/admin/updateauthor/${id}`, { author_name });
      if (status === 200) {
        dispatch({
          type: LOAD_AUTHOR_SUCCESS,
          payload: {
            author,
          },
        });
        dispatch(push("/admin/authors"));
      }
    } catch (err) {
      console.log("authorEdit ERR", err);
      dispatch({
        type: API_AUTHORS_ERROR,
        payload: {
          errMsg: err.response.data.message,
        },
      });
      toast.error(err.response.data.message);
    }
  };
}
