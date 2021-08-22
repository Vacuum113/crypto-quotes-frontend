import React from "react";
import { makeStyles } from "@material-ui/core";
import MainWindow from "../../components/MainWindow";

const useStyles = makeStyles({
  tabs: {},
});

export default () => {
  const classes = useStyles();

  return (
    <div>
      <MainWindow className={classes.tabs} />
    </div>
  );
};
