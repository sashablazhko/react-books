import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { auth } from "./reducers/auth.reducer";
import { books } from "./reducers/books.reducer";
import { authors } from "./reducers/authors.reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    books,
    authors,
  });
// export default (history) => combineReducers({
//   router: connectRouter(history),
//   ... // rest of your reducers
// })
