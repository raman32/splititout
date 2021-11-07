import { doc, setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "./App";
import { auth, db } from "./index";

  export default function SignUp({}) {
      const {setUser} = useContext(UserContext)
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [error, setError] = useState("");
      const signUp = useCallback((email,password)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // creating a firestore document {userID}
          await setDoc(doc(db, "users", user.uid), {
            name: "Not Set",
            due: 0
          });
          setUser(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          // ..
        });},[])
        const signIn= useCallback((email,password)=>{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
        })
        return (
            <div className="container border mx-auto my-10 py-4 text-center text-black">
                <div className="my-10">
                <span className="mr-10">Email</span>
                <input value={email} onChange={({target:{value}})=>setEmail(value)} className="border"/>
                </div>
                <div className="my-10">
                <span className="mr-10">Password</span>
                <input value={password} onChange={({target:{value}})=>setPassword(value)} type="password" className="border"/>
                </div>
                <div className="my-10 text-red-500">
                    {error ? error : ""}
                </div>
                <div>
                <span className="my-10 mx-4">
                <button onClick={()=>signUp(email,password)} className="border bg-gray-100 px-4 py-2">Sign UP</button>
                </span>
                <span className="my-10 mx-4">
                <button onClick={()=>signIn(email,password)} className="border bg-gray-100 px-4 py-2">Log In</button>
                </span>
                </div>
               
            </div>
        );
  }