import React from "react";
import AccountService from "./accountService/accountService";

const ServicesContext = React.createContext<Context>(
  {
    accountService: new AccountService()
  }
);
export const ServicesContextProvider = ServicesContext.Provider;
export default ServicesContext;

export interface Context {
  accountService: AccountService
}