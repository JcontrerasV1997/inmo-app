import {v4 as uuidv4} from "uuid";
import { db, devolverDocumento, guardarDocumento } from "../server/firebase";

export const uploadImage = (photos) =>{
    // // capturar la imagen
    // const photo = photos[0]
    // // renombrar la imagen
    // const claveUnicaFoto= uuidv4();
    // // obtener el nombre de la foto
    // const nombreFoto= photo.name;
    // // obtener la extension de la imagen esto porque algunos tienen el caracter punto
    // const extensionFoto = nombreFoto.split('.').pop();
    // // crear el nuevo nombre de la foto - alias
    // const alias = (nombreFoto.split(".")[0] + "_" + claveUnicaFoto + "."+ extensionFoto).replace(/\s/g,"-").toLowerCase();
    
    // // Mandar La data
    // guardarDocumento(alias,photo).then(metadata=>{
    //   devolverDocumento(alias).then(urlFoto =>{
    //     foto=urlFoto;
    //      db.collection(`${uid}/inmo/profile/${idProfile}`).doc(idProfile).set({photo:urlFoto})
    //   })
    // })
  }