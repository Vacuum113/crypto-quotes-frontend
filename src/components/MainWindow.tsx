import React, { useContext, useState, FC } from "react";
import { Box, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import ServicesContext, { Context } from "../services/ServicesContext";

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    border: `2px solid ${theme.palette.primary.main}`,
    WebkitBorderBottomRightRadius: "5px",
    minHeight: "77vh",
  },
  root: {
    display: "flex",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  tabsContainer: {
    width: "100%",
  },
}));

const MainWindow: FC<React.HTMLAttributes<HTMLDivElement>> =
  (): JSX.Element => {
    const classes = useStyles();

    return (
      <div className={classes.root}>

      </div>
    );
  };

export default MainWindow;
