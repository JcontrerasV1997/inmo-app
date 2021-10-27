import { db, firebase } from "../../server/firebase";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { addNewProfile, profileClearLogout } from "./profile";

// Metodo para logearse con email y password
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        switch (e.code) {
          case "auth/user-not-found":
            Swal.fire("Error", "Usuario no esta registrado", "error");
            break;
          case "auth/invalid-email":
            Swal.fire("Error", "Email Invalido", "error");
            break;
          case "auth/wrong-password":
            Swal.fire("Error", "Contraseña incorrecta", "error");
            break;
          default:
            break;
        }
      });
  };
};

// when create any user, automatically create the profile of user.
export const startRegisterWithEmailPasswordName = (email, password, name) => {
  const data = {
    nombre: "",
    apellidos: "",
    email: "",
    telefono: ""
  };
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName, user.email));
        const doc = await db.collection(`${user.uid}/inmo/profile`).add(data);
        dispatch(addNewProfile(doc.id, data));
      })
      .catch((e) => {
        console.log(e)
        e.code = "auth/email-already-in-use"
          ? Swal.fire("Error", "Email en uso, registro otro", "error")
          : null;
      });
  };
};



export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
  },
});


export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(profileClearLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
