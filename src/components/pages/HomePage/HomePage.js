import React from "react";
import classes from "./HomePage.module.css";
import BooksList from "../../BooksList/BooksList";
import LastReading from "../../LastReading/LastReading";

const Home = props => {
  return (
    <div className={classes.Home} style={{ background: `url(${props.bg})` }}>
      <div className={classes.container}>
        <LastReading />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
        <BooksList />
      </div>
    </div>
  );
};

export default Home;
