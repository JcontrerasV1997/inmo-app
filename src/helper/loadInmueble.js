import { db } from "../server/firebase"

export const loadInmueble= async(uid) =>{
    const profileSnap=await db.collection(`${uid}/inmo/profile`).get()
    const profile=[];
    
    profileSnap.forEach(snapHijo =>{
        profile.push({
            id:snapHijo.id,
            ...snapHijo.data()
        })
    })
    return profile;
}
