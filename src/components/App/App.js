import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../../hoc/Layout/Layout";
import Home from "../pages/Home/Home";
import bg from "../../resources/images/bg.jpg";
import Book from "../pages/Book/Book";
import Chapter from "../pages/Chapter/Chapter";
import Admin from "../../hoc/Admin/Admin";
import UserCabinet from "../pages/UserCabinet/UserCabinet";
import SignIn from "../pages/SignIn/SignIn";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/book/:idBook/:idChapter" component={Chapter} />
          <Route path="/book/:idBook" component={props => <Book bg={bg} {...props} />} />
          <Route path="/signin" component={props => <SignIn bg={bg} {...props} />} />
          <Route path="/cabinet" component={UserCabinet} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/" component={props => <Home bg={bg} {...props} />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
