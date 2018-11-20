import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../../hoc/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import bg from "../../resources/images/bg.jpg";
import BookPage from "../pages/BookPage/BookPage";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import Admin from "../../hoc/Admin/Admin";
import UserCabinetPage from "../pages/UserCabinetPage/UserCabinetPage";
import AuthPage from "../pages/AuthPage/AuthPage";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/book/:idBook/:idChapter" component={ChapterPage} />
          <Route path="/book/:idBook" component={props => <BookPage bg={bg} {...props} />} />
          <Route path="/auth/signin" component={props => <AuthPage bg={bg} {...props} />} />
          <Route path="/auth/signup" component={props => <AuthPage bg={bg} singup {...props} />} />
          <Route path="/cabinet" component={UserCabinetPage} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/" component={props => <HomePage bg={bg} {...props} />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
