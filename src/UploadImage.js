import { ref, uploadBytes } from "@firebase/storage";
import { useCallback, useContext, useState } from "react"
import { db, storage } from ".";
import  {v4 as uuid} from 'uuid';
import { addDoc, collection, doc, getDoc, increment, setDoc, updateDoc } from "@firebase/firestore";
import { UserContext } from "./App";
export default function UploadImage({groupId}){
    const {user} = useContext(UserContext)
    const [file,setFile] = useState(null);
    console.log(file)
    const [total,setTotal] = useState(0);
    const [fullpath,setFullpath] =  useState("")
    const uploadImage = useCallback(async (file)=>{
        //const id = uuid();
        const id = uuid()
        const storageRef = ref(storage, id+'.jpg');
        const snapshot = await uploadBytes(storageRef, file);
        setTotal(10);
        setFullpath(storageRef.fullPath)
    },[])
    const createTransaction = useCallback(async()=>{
        await addDoc(collection(db, "transactions"), {
            date: Date.now(),
            group: groupId,
            isVerified: false,
            total: total,
            user: user.uid,
            verifiedBy: [user.uid],
            picture: fullpath
          });
          const groupDocRef = doc(db, "groups", groupId);
          const groupData = await getDoc(groupDocRef);
          const group = await groupData.data()
          console.log(group.users)
          const userLength = group.users.length
          for (let index = 0; index < userLength; index++) {
            const id = group.users[index]
            const docref  = await updateDoc(doc(db, "users", id), {
                due: increment(total/userLength)
              })
          }
    

        setTotal(0)
        setFile(null)
        setFullpath("")

    })
    return <div>
        <div>
            Upload or take a image
        </div>
        <input type="file" onChange={({target:{files}})=>files  && setFile(files[0])}  />
        
        {file && <img src={URL.createObjectURL(file)} className="max-w-sm mx-auto"/>}
        <div className="my-4">
        <button className="border px-4 py-2" onClick={()=>uploadImage(file)}>Post Transactions</button>
        </div>
        <div>AI predicted Total: <input type="text" value={total} onChange={({target:{value}})=>setTotal(value)} className="border  px-4 my-2"></input></div>
        <div><button className="shadow-sm border px-4 py-2" onClick={createTransaction}>Ok Confirm</button></div>
    </div>
}