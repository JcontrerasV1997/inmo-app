import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../../redux/actions/auth";

export const MenuDerecha = ({ classes, name }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className={classes.list}>
      <List>
      <ListItem>
        <Avatar classes={{ primary: classes.avatarSize }}></Avatar>
          <Typography style={{paddingLeft:10}}>{name}</Typography>
        </ListItem>
        <Divider />

        <ListItem button>
          <ListItemIcon>
            <MailOutlineIcon></MailOutlineIcon>
          </ListItemIcon>
          <ListItemText primary="Mensajes" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesion" />
        </ListItem>

        <Divider />
      </List>
    </div>
  );
};
