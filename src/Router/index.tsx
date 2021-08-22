import React, { useContext } from "react";
import { SignIn, SignUp, Home } from "../pages";
import { Switch, Route, Redirect } from "react-router-dom";
import { Routes } from "../configuration";
import ServicesContext, { Context } from "../services/ServicesContext";

export default function () {
  return (
    <Switch>
      <UnauthenticatedRoute path={Routes.signIn} exact={true}>
        <SignIn />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute path={Routes.signUp} exact={true}>
        <SignUp />
      </UnauthenticatedRoute>
      <AuthenticatedRoute path={Routes.home} exact={true}>
        <Home />
      </AuthenticatedRoute>
    </Switch>
  );
}

const AuthenticatedRoute = (props: any) => {
  const { children, ...rest }: { children: JSX.Element } = props;
  const accountService = useContext<Context>(ServicesContext).accountService;

  return (
    <Route
      {...rest}
      render={(props) =>
        accountService.isTokenExist() ? (
          children
        ) : (
          <Redirect
            to={`${Routes.signIn}?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};

const UnauthenticatedRoute = (props: any) => {
  const { children, ...rest }: { children: JSX.Element } = props;
  const accountService = useContext<Context>(ServicesContext).accountService;

  return (
    <Route
      {...rest}
      render={(props) =>
        !accountService.isTokenExist() ? children : <Redirect to="/" />
      }
    />
  );
};
