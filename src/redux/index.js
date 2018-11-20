import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducer";

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);

const store = createStore(reducer(history), enhancer);
window.store = store;

export default store;
