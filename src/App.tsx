import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import Layout from "./components/Layout";
import Router from "./Router";
import AccountService from "./services/accountService/accountService";
import { ServicesContextProvider } from "./services/ServicesContext";

const theme = createTheme({
  palette: {
    primary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#000",
    },
  },
});

// @ts-ignore
window.accountService = new AccountService();

export default () => {
  return (
    <ServicesContextProvider value={
      {
        // @ts-ignore
        accountService: window.accountService
      }
    }>
      <ThemeProvider theme={theme}>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </ServicesContextProvider>
  );
};
