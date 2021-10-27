import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import React from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { HookForm } from "../../hooks/HookForm";
import { startLoginEmailPassword } from "../../redux/actions/auth";
const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 8,
  },

  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

export const Login = () => {
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = HookForm({
        email: "",
        password: "",
      });
      const { email, password } = formValues;
      const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
      };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <Lock></Lock>
        </Avatar>
        <Typography component="h1" variante="h5">
          Ingrese Usuario
        </Typography>
        <form onSubmit={handleLogin} style={style.form}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="Password"
            name="password"
            margin="normal"
            value={password}
            onChange={handleInputChange}
            required
          ></TextField>
          <Button 
          fullWidth 
          variant="contained" 
          color="primary"
          type="submit"
          >
        Enviar
          </Button>
        </form>
          <Link className="text-center" to="/auth/register">
          Crear Nueva Cuenta
        </Link>
      </div>
    </Container>
  );
};
