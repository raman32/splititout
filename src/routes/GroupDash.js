import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "..";
import { UserContext } from "../App";
import Transaction from "../Transaction";
import UploadImage from "../UploadImage";
import User from "../User";

export default function GroupDash(){
const params = useParams();
const {user} = useContext(UserContext);
const [data,setData] = useState()
const [transactions,setTransactions] = useState([])
useEffect(async ()=>{
    const groupDocRef = doc(db, "groups", params.groupId);
    const groupData = await getDoc(groupDocRef);
    if (groupData.exists()) {
        setData(groupData.data())
        console.log(groupData.data())
      } else {
        // doc.data() will be undefined in this case       
      }
    const unsub = onSnapshot(doc(db, "groups", params.groupId), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        setData(doc.data())
        //console.log( " data: ", doc.data());
      });
    const transactionRef = collection(db, "transactions");
    if(user){
        const query_ = query(transactionRef,where("group","==", params.groupId));
        const transactionsData = await getDocs(query_)
    if (transactionsData) {
        setTransactions(transactionsData.docs)
        console.log(transactionsData.docs)
      } else {
        // doc.data() will be undefined in this case       
      }
    }
},[user])
if(!data) return <div>Loading</div>
return (
    <div className="container mx-auto text-center">
        Welcome to Split the bill!!!!!
        <div className="text-lg">
        Group: {data.name}
        </div>
        <div className="bg-gray-100 max-w-sm rounded mx-auto my-4 py-2 text-center">
        <div className="font-bold">Members:</div>
        {data.users.map((user)=><User id={user}/>)}
        <div className="cursor-pointer shadow-sm bg-white w-36 px-4 py-2 mx-auto my-2">+ Send Invite Link</div>
        </div>
        <div className="my-2">
            <UploadImage groupId={params.groupId} u/>
        </div>
        <div className="max-w-sm mx-auto my-2">  
        <div>All the Previous Transactions.</div>    
        {transactions && transactions.map((transaction)=><Transaction transactionId={transaction.id}/>)}
        </div>
    </div>
);
}