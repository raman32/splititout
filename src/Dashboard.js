import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState, } from "react";
import { db } from "./index";
import { UserContext } from "./App";
import Groups from "./Groups";

export function Dashboard({}){
const {user} = useContext(UserContext);
const[data,setData] = useState(null);
const [error,setError] = useState("");
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
        
      }
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        //console.log( " data: ", doc.data());
      });
      return unsub()
},[])
if(!data) return <div>Loading</div>
return (
    <div>
        <div className="my-10 text-3xl">
        {data.Name}
        </div>
        <div>
        <span>Your total credit is:</span>
        <span>{data.Credit}</span>
        <Groups groups={data.groups}/>
        </div>
    </div>
);
}