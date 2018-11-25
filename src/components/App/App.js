import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import Layout from "../../hoc/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import bg from "../../resources/images/bg.jpg";
import BookPage from "../pages/BookPage/BookPage";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import Loader from "../UI/Loader/Loader";

const AsyncAdmin = Loadable({
  loader: () => import("../../hoc/Admin/Admin"),
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
          <Route path="/book/:idBook" component={props => <BookPage bg={bg} {...props} />} />
          <Route path="/auth/signin" component={props => <AuthPage bg={bg} {...props} />} />
          <Route path="/auth/signup" component={props => <AuthPage bg={bg} singup {...props} />} />
          <ProtectedRoute path="/cabinet" component={AsyncUserCabinetPage} />
          <Route path="/admin" component={AsyncAdmin} />
          <Route exact path="/" component={props => <HomePage bg={bg} {...props} />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
