import {  addDoc, doc, updateDoc, arrayUnion, collection,  } from "@firebase/firestore";
import { useCallback, useContext, useState } from "react";
import { db } from ".";
import { UserContext } from "./App";

export default function CreateGroup({show,onHide}){
    const [name, setName] = useState("")
    const {user} = useContext(UserContext)
    const createGroup = useCallback(async (name)=>{
    const groupRef =  await addDoc(collection(db, "groups"), {
            name: name,
            users: [user.uid]
          });
    const userDocRef = doc(db,"users",user.uid)
    await updateDoc(userDocRef, {
        groups: arrayUnion(groupRef.id)
    });
    onHide();
    },[])
    if(!show) return <></>
    return <div className="absolute top-0 left-0 h-full w-full z-10 bg-gray-100 ">
        <div className="max-w-sm max-h-20 mx-auto my-32 text-black ">
            <span className="mx-4">
                Name
            </span>
            <input value={name} onChange={({target:{value}  })=>setName(value)}/>
        </div>
        <div className="my-2 py-2">
        <button onClick={()=>createGroup(name)} className="border px-4 py-4">Create</button>
        </div>
        <div className="my-2 py-2">
        <button onClick={onHide} className="border px-4 py-4">Close</button>
        </div>
    </div>
}