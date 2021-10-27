import Swal from "sweetalert2";
import { db } from "../server/firebase";

export const updateProfile = async (data, uid, id) => {
  try {
    await db.collection(`${uid}/inmo/profile`).doc(id).update(data);
    Swal.fire({ title: "Perfil Actualizado", icon: "success" });
  } catch (error) {

  }
};
