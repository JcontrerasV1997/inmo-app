import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { MenuDerecha } from "./MenuDerecha";
import { MenuIzquierda } from "./MenuIzquierda";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BusinessIcon from "@material-ui/icons/Business";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  grow: {
    flexGrow: 1,
  },

  avatarSize: {
    width: 40,
    height: 40,
  },

  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
  list: {
    width: 250,
  },
  text: {
    paddingLeft: "20px",
  },
}));

export const BarSession = () => {
  const { profileActivo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };
  const classes = useStyles();
  const { name } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    right: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      <Drawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        anchor="left"
      >
        <div
          role="button"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <MenuIzquierda classes={classes}></MenuIzquierda>
        </div>
      </Drawer>

      <Drawer
        open={state.right}
        onClose={toggleDrawer("right", false)}
        anchor="right"
      >
        <div
          role="button"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <MenuDerecha classes={classes} name={name}></MenuDerecha>
        </div>
      </Drawer>

      <Toolbar>
        {/* Menu Izquierda */}
        {name !== undefined ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer("left", true)}>
              <MenuIcon></MenuIcon>
            </IconButton>
            <div className={classes.sectionDesktop}>
              <Typography variant="h6">Bienvenido: {name}</Typography>
            </div>
            <div className={classes.sectionMobile}>
              <Typography variant="button" classes={classes.text}>
                Panel Admin
              </Typography>
            </div>
          </>
        ) : (
          <>
            <BusinessIcon></BusinessIcon>
            <Typography variant="button" classes={classes.text}>
              Inmo-App
            </Typography>
          </>
        )}
        {/* Menu Derecha */}
        <div className={classes.grow}></div>
        <div className={classes.sectionDesktop}>
          {name !== undefined ? (
            <>
              <Button color="inherit">
                <MailOutlineIcon></MailOutlineIcon>
                <Typography variant="button" style={{paddingLeft:5}}>
                  Mensajes
                </Typography>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                <ExitToAppIcon />
                <Typography variant="button" style={{paddingLeft:5}}>
                  Cerrar Sesion
                </Typography>
              </Button>
              <Avatar src={profileActivo.urlFoto}></Avatar>
            </>
          ) : null}
        </div>

        {name !== undefined ? (
          <div className={classes.sectionMobile}>
            <IconButton color="inherit" onClick={toggleDrawer("right", true)}>
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
          </div>
        ) : null}
      </Toolbar>
    </div>
  );
};
