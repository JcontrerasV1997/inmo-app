import React, { useEffect, useState } from "react";
import { Grid, MuiThemeProvider } from "@material-ui/core";
import { firebase } from "../server/firebase";
import { useDispatch } from "react-redux";
import { login} from "../redux/actions/auth";
// import { startLoading } from "../actions/ui";
import theme from "../theme/theme";
import { AppNadvar } from "../components/layout/AppNadvar";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRouter";
import { PerfilUsuario } from "../components/security/PerfilUsuario";
import { PanelAdmin } from "../components/views/PanelAdmin";
import { startLoadingProfile } from "../redux/actions/profile";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingProfile(user.uid));
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
      setChecking(false);


    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <h1>Espere ...</h1>;
  }
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNadvar />
        <Grid container>
          <Switch>
            <PublicRoute
              path="/auth"
              component={AuthRouter}
              isAuth={isLoggedIn}
            />
            <PrivateRoute
              path="/"
              exact
              component={PanelAdmin}
              isAuth={isLoggedIn}
            />
            <PrivateRoute
              path="/perfil"
              exact
              component={PerfilUsuario}
              isAuth={isLoggedIn}
            />
            <Redirect to="/auth/login" />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
};
