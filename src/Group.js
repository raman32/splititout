import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./index";

export default function Group ({id}) {
    const [group,setGroup] =useState(null);
    useEffect(async ()=>{
        const groupDocRef = doc(db, "groups", id);
        const groupData = await getDoc(groupDocRef);
        if (groupData.exists()) {
            setGroup(groupData.data())
            console.log(groupData.data())
          } else {
            // doc.data() will be undefined in this case       
          }
        const unsub = onSnapshot(doc(db, "groups", id), (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", doc.data());
            //console.log( " data: ", doc.data());
          });
          return unsub()
    },[])
    if(!group) return <div> Loading</div>
    return <Link to={`/group/${id}`} key={id}><div className="max-w-sm shadow-sm my-2 mx-auto bg-white cursor-pointer hover:bg-gray-100 py-2 px-4">{group.name}</div></Link>
}