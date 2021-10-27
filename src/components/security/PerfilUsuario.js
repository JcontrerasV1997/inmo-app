import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../helper/profileHelper";
import { HookForm } from "../../hooks/HookForm";
import { db, devolverDocumento, guardarDocumento } from "../../server/firebase";
import ImageUploader from "react-images-upload";
import {v4 as uuidv4} from "uuid";
import Swal from "sweetalert2";
import { startPhotoUrl } from "../../redux/actions/profile";
const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
};

export const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const { uid, name } = useSelector((state) => state.auth);
  const { profileActivo } = useSelector((state) => state.profile);

  
  const [formValues, handleInputChange, reset] = HookForm({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });
  const { nombre, apellidos, email, telefono } = formValues;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(formValues, uid, profileActivo.id);
  }

   const uploadImage = (photos) =>{
    // capturar la imagen
    const photo = photos[0]
    // renombrar la imagen
    const claveUnicaFoto= uuidv4();
    // obtener el nombre de la foto
    const nombreFoto= photo.name;
    // obtener la extension de la imagen esto porque algunos tienen el caracter punto
    const extensionFoto = nombreFoto.split('.').pop();
    // crear el nuevo nombre de la foto - alias
    const alias = (nombreFoto.split(".")[0] + "_" + claveUnicaFoto + "."+ extensionFoto).replace(/\s/g,"-").toLowerCase();
    guardarDocumento(alias,photo).then(metadata=>{
      devolverDocumento(alias).then(urlFoto =>{
        db.collection(`${uid}/inmo/profile`).doc(profileActivo.id).update({foto:urlFoto})
        dispatch(startPhotoUrl(urlFoto));
          Swal.fire("Success", "Su foto ha sido guardada con exito", "success");
      })
    })
  }
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Avatar src ={profileActivo.urlFoto} style={style.avatar} />
        <Typography component="h1" variant="h5">
          Actualizar Perfil Del usuario: {name}
        </Typography>
        <form style={style.form} onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="nombre"
                  variant="outlined"
                  fullWidth
                  label="Nombre"
                  onChange={handleInputChange}
                  value={nombre}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="apellidos"
                  variant="outlined"
                  fullWidth
                  label="Apellidos"
                  onChange={handleInputChange}
                  value={apellidos}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  fullWidth
                  label="E-Mail"
                  onChange={handleInputChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="telefono"
                  variant="outlined"
                  fullWidth
                  label="Telefono"
                  onChange={handleInputChange}
                  value={telefono}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  type="hidden"
                  name="id"
                  // value={perfil.id}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <ImageUploader
                  withIcon={false}
                  key={1000}
                  singleImage={true}
                  buttonText="Seleccione su imagen de Perfil"
                  onChange={uploadImage}
                  imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                  maxFileSize={5242880}
                />
              </Grid>
            </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
