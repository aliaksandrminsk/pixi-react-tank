import React from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import classes from "./Header.module.css";

const Header = () => {
  const { tankStore: store } = useStore();

  const clickStartHandler = () => {
    store.speed = 2;
  };
  const clickStopHandler = () => {
    store.speed = 0;
  };
  const changeRotationHandler = (value: string) => {
    store.degrees = Number(value);
  };

  return (
    <>
      <h1 className={classes.title}>Tank</h1>
      <div className={classes.header}>
        <div className={classes.leftItem}>
          <label htmlFor="rotation">Rotation (between 0 and 360):</label>
          <input
            type="range"
            id="rotation"
            name="rotation"
            min="0"
            max="360"
            disabled={store.speed > 0}
            value={store.degrees}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              changeRotationHandler(event.target.value)
            }
          />
        </div>
        <div className={classes.rightItem}>
          <input
            type="button"
            value="Start"
            className={classes.button}
            onClick={clickStartHandler}
            disabled={store.speed > 0}
          />
          <input
            type="button"
            value="Stop"
            className={classes.button}
            onClick={clickStopHandler}
            disabled={store.speed === 0}
          />
        </div>
      </div>
    </>
  );
};

export default observer(Header);
