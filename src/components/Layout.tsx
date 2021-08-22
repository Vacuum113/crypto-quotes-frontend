import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Routes } from "../configuration";
import ServicesContext, { Context } from "../services/ServicesContext";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    backgroundColor: theme.palette.primary.dark,
    justifyContent: "space-between",
  },
  content: {
    margin: "50px 50px",
  },
  layout: {
    height: "100%",
    width: "100%",
    display: "flex",
    zIndex: 1,
    position: "relative",
    minWidth: "auto",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: "white",
  },
}));

export default observer((props: any) => {
  const accountService = useContext<Context>(ServicesContext).accountService;

  const classes = useStyles();
  const history = useHistory();
  let tokenExist = accountService.isTokenExist();

  return (
    <div className={classes.layout}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">Crypto Quotes</Typography>
          {tokenExist ? (
            <Button
              color="inherit"
              onClick={(e) => {
                accountService.logout();
                history.push(Routes.signIn);
              }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
});
