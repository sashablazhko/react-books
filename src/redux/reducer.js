import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import { books } from "./reducers/books.reducer";
import authorsReducer, { moduleName as authorsModule } from "../ducks/authors";

export default history =>
  combineReducers({
    router: connectRouter(history),
    [authModule]: authReducer,
    books,
    [authorsModule]: authorsReducer,
  });
// export default (history) => combineReducers({
//   router: connectRouter(history),
//   ... // rest of your reducers
// })
