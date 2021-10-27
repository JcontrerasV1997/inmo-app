import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Login } from "../components/security/Login";
import { RegistrarUsuarios } from "../components/security/RegistrarUsuarios";
export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={RegistrarUsuarios} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};
