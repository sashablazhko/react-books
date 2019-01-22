import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import AdminLayout from "../../../hoc/AdminLayout/AdminLayout";
import AdminBooksListPage from "../../admin/pages/AdminBooksListPage/AdminBooksListPage";
import AdminBookPage from "../../admin/pages/AdminBookPage/AdminBookPage";
import EditChapter from "../../admin/EditChapter/EditChapter";
import AdminAuthorsListPage from "../../admin/pages/AdminAuthorsListPage/AdminAuthorsListPage";
import AdminAuthorPage from "../../admin/pages/AdminAuthorPage/AdminAuthorPage";

export class AdminPage extends Component {
  render() {
    return (
      <AdminLayout>
        <Switch>
          <Route path="/admin/books/new" component={props => <AdminBookPage {...props} create />} />
          <Route path="/admin/books/:idBook" component={AdminBookPage} />
          <Route path="/admin/books" component={AdminBooksListPage} />
          <Route path="/admin/chapters" component={EditChapter} />
          <Route path="/admin/authors/new" component={props => <AdminAuthorPage {...props} create />} />
          <Route path="/admin/authors/:idAuthor" component={AdminAuthorPage} />
          <Route path="/admin/authors" component={AdminAuthorsListPage} />
        </Switch>
      </AdminLayout>
    );
  }
}

export default AdminPage;
