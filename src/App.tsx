import React from "react";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.Content}>
        <Header />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
