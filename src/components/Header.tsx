import React from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import classes from "./Header.module.css";

const Header = () => {
  const { tankStore: store } = useStore();

  const clickStartHandler = () => {
    store.startTankHandler();
  };
  const clickStopHandler = () => {
    store.stopTankHandler();
  };
  const changeRotationHandler = (value: string) => {
    store.degrees = Number(value);
  };

  return (
    <>
      <div className={classes.title}>Tank</div>
      <div className={classes.header}>
        <div className={classes.leftItem}>
          <label htmlFor="rotation">Rotation (between 0 and 360):</label>
          <input
            type="range"
            id="rotation"
            name="rotation"
            min="0"
            max="360"
            disabled={store.speed > 0 || !store.isTexturesLoaded}
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
            disabled={store.speed > 0 || !store.isTexturesLoaded}
          />
          <input
            type="button"
            value="Stop"
            className={classes.button}
            onClick={clickStopHandler}
            disabled={store.speed === 0 || !store.isTexturesLoaded}
          />
        </div>
      </div>
    </>
  );
};

export default observer(Header);
