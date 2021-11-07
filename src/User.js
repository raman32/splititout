import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react"
import { db } from ".";

export default function User({id}){
    const [data,setData] = useState(null)
    useEffect(async ()=>{
        const userDocRef = doc(db, "users", id);
        const userData = await getDoc(userDocRef);
        if (userData.exists()) {
            setData(userData.data())
            console.log(userData.data())
          } else {
            //Error
            console.log(userData.error())
          }
    },[])
    if(!data) return <div>Loading</div>
    return <div> {data.name} </div>
}