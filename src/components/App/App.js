import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import ProtectedRoute from "hoc/ProtectedRoute/ProtectedRoute";
import Layout from "hoc/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import BookPage from "../pages/BookPage/BookPage";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import Loader from "../UI/Loader/Loader";

const AsyncAdmin = Loadable({
  loader: () => import("../../components/pages/AdminPage/AdminPage"),
  loading: Loader,
});
const AsyncUserCabinetPage = Loadable({
  loader: () => import("../pages/UserCabinetPage/UserCabinetPage"),
  loading: Loader,
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/book/:idBook/:idChapter" component={ChapterPage} />
          <Route path="/book/:idBook" component={BookPage} />
          <Route path="/auth/signin" component={AuthPage} />
          <Route path="/auth/signup" component={props => <AuthPage signup {...props} />} />
          <ProtectedRoute path="/cabinet" component={AsyncUserCabinetPage} />
          <ProtectedRoute path="/admin" component={AsyncAdmin} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
