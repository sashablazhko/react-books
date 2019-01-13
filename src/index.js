import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};
renderApp();
// ReactDOM.render(app, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./components/App/App", () => {
    renderApp();
  });
}
