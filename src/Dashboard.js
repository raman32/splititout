import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState, } from "react";
import { db } from "./index";
import { UserContext } from "./App";
import Groups from "./Groups";
import CreateGroup from "./CreateGroup";

export function Dashboard({}){
const {user} = useContext(UserContext);
const[data,setData] = useState(null);
const [error,setError] = useState("");
const [showCreateGroup,setShowCreateGroup] = useState(false);
useEffect(async ()=>{
    console.log(user.uid)
    const userDocRef = doc(db, "users", user.uid);
    const userData = await getDoc(userDocRef);
    if (userData.exists()) {
        setData(userData.data())
        console.log(userData.data())
      } else {
        // doc.data() will be undefined in this case
        setError("Some Error Occured");
       console.log(userData.error())
      }
    // const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
    //     //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     setData(doc.data())
    //     console.log(" data: ", doc.data());
    //     //console.log( " data: ", doc.data());
    //   });
},[])
if(!data) return <div>Loading</div>
return (
    <div className="bg-gray-50">
    <div className="container mx-auto text-center ">
        <div className="my-10 text-3xl">    
        Howdy! {data.name}
        </div>
        <div>
        <span>Your total due is: </span>
        <span className="font-bold">{data.due}</span>
        <Groups groups={data.groups}/>
        <div className="max-w-sm shadow-sm my-2 mx-auto bg-white cursor-pointer hover:bg-gray-100  py-2 px-4" onClick={()=>setShowCreateGroup(true)}>+ Create New Group</div>
        </div>
        <CreateGroup show ={showCreateGroup} onHide={()=>setShowCreateGroup(false)}/>
    </div>
    </div>
);
}