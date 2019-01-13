import React, { Component } from "react";
import classes from "./HomePage.module.css";

import bg from "../../../resources/images/bg.jpg";
import BooksList from "../../BooksList/BooksList";
import LastReading from "../../LastReading/LastReading";

const Home = () => {
  return (
    <div className={classes.Home} style={{ background: `url(${bg})` }}>
      <div className="container background">
        {/* <code>
            <pre>{JSON.stringify(this.props, null, 4)}</pre>
          </code> */}
        <LastReading />
        <BooksList />
      </div>
    </div>
  );
};

export default Home;
