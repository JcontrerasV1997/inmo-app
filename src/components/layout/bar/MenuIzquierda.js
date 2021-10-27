import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonIcon from "@material-ui/icons/Person";
import ViewListIcon from "@material-ui/icons/ViewList";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { useHistory } from "react-router-dom";

export const MenuIzquierda = ({ classes }) => {
  const history = useHistory();
  return (
    <div className={classes.list}>
      <List>
        <ListItem button onClick={() => history.push("/perfil")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Inmueble" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Listar Inmueble" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Mensaje" />
        </ListItem>
      </List>

      <Divider />
    </div>
  );
};
