import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from ".";

export default function Transaction({transactionId}){
    const [transaction,setTransaction]  =useState({});
    const [imageUrl,setImageUrl] = useState();
    useEffect(async ()=>{
        const transactionRef = doc(db, "transactions", transactionId);
        const transactionData = await getDoc(transactionRef);
        if (transactionData.exists()) {
            setTransaction(transactionData.data())
            console.log(transactionData.data())
          } else {
            // doc.data() will be undefined in this case       
          }
        // const unsub = onSnapshot(doc(db, "transactions", transactionId), (doc) => {
        //     const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        //     console.log(source, " data: ", doc.data());
        //     setTransaction(doc.data())
        //     //console.log( " data: ", doc.data());
        //   });
          const storageRef = ref(storage, transaction.picture);
          const image = await getDownloadURL(storageRef)
          setImageUrl(image)

    },[])
    return <div className="border shadow-sm">
        <div>Total Amount: {transaction.total}</div>
        <div>Date: {Date(transaction.date).toString("mm/dd/yyyy")}</div>
        <div className="max-w-sm">
           {imageUrl && <img src={imageUrl} />}
        </div>
    </div>
}