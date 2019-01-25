import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import App from "./components/App/App";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundry>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ErrorBoundry>
    </Provider>,
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
