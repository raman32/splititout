import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import { auth } from './index';
import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { Dashboard } from './Dashboard';

export const UserContext = React.createContext({user:null, setUser: ()=>{}})

function App() {
  const [user,setUser] = useState()
  const value = useMemo(
    () => ({ user, setUser }), 
    [user]
  );
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
  },[])
  return (
    <UserContext.Provider value={value}>
    <div className="App">
      {user ? <Dashboard/>: <SignIn/>}
     
    </div>
    </UserContext.Provider>
  );
}

export default App;
