import { db } from "../server/firebase"

export const loadProfile= async(uid) =>{
    const profileSnap=await db.collection(`${uid}/inmo/profile`).get()
    const arrayProfile=[];
   
    profileSnap.forEach(snapHijo =>{
        arrayProfile.push({
            id:snapHijo.id,
            ...snapHijo.data()
        })
    })
    const objecProfile=Object.assign({},arrayProfile[0])
    return objecProfile;
}
