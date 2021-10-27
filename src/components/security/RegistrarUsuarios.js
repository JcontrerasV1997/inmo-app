import {
  Avatar,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import React from "react";
import { HookForm } from "../../hooks/HookForm";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../redux/actions/ui";
import { startRegisterWithEmailPasswordName } from "../../redux/actions/auth";
import validator from "validator";
import { Link } from "react-router-dom";


const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },

  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

export const RegistrarUsuarios = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange, reset] = HookForm({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const { nombre, email, password, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, nombre,formValues));
      reset();
    }
  };

  const isFormValid = () => {
    if (nombre.trim().length === 0) {
      dispatch(setError("nombre requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email no valido"));
      return false;
    } else if (password !== password2 && password.length < 5) {
      dispatch(setError("contraseña debe tener 6 caracteres"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <Container maxWidth="md">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockIcon></LockIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar Usuario.
        </Typography>
        <form style={style.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {msgError}
            <Grid item md={6} xs={12}>
              <TextField
                name="nombre"
                fullWidth
                label="Ingrese su Nombre de Usuario"
                onChange={handleInputChange}
                value={nombre}
                required
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Ingrese Su email"
                onChange={handleInputChange}
                value={email}
                required
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Ingrese su contraseña"
                onChange={handleInputChange}
                value={password}
                required
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="password"
                name="password2"
                fullWidth
                label="confirmar contraseña"
                onChange={handleInputChange}
                password={password2}
                required
              ></TextField>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                style={style.submit}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Link to="/auth/login" className="link mt-1">
          Ya tiene cuenta?
        </Link>
      </div>
    </Container>
  );
};
