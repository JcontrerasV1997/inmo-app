import { loadProfile } from "../../helper/loadProfile";
import { types } from "../types/types";

export const setProfile = (profile) => ({
    type: types.profileLoad,
    payload: profile,
  });

export const addNewProfile = (id, profile) => ({
    type: types.profileAddNew,
    payload: {
      id,
      ...profile,
    },
  });
  
// CARGA UNA COLECCION APARTIR DE UN OBJETO
  export const startLoadingProfile = (uid) => {
    return async (dispatch) => {
      const profile = await loadProfile(uid);
      dispatch(setProfile(profile));
    };
  };

//   metodo asincrono dispara la llamada de la foto
  export const startPhotoUrl = (url) => {
    return async (dispatch) => {
      dispatch(startPhoto(url));
    };
  };

  // metodo con la data y url de la foto
  export const startPhoto = (url) => ({
    type: types.profileFileUrl,
    payload: {
      url,
    },
  });

  export const profileClearLogout = () =>({
    type:types.profileClearLogout
})

  
  