import { firebaseDB } from "./firebase";
// this file contains some helper functions used throughout the appplication

// create user in firebase if logging in for first time
const initializeUser = (user, UserSchema) => {

  // create user's data if doesn't exist
  let loc = `users/${correctEmail(user.email)}/`;
  let ref = firebaseDB.ref(loc);
  ref.once("value").then( (snapshot) =>{
    if(!snapshot.exists())
    {
      let userObj = UserSchema(user.email,user.displayName);
      
      for (var key in userObj) 
      {
        if (userObj.hasOwnProperty(key)) 
          firebaseDB.ref(loc+key).set(userObj[key]);
      }    
    }
  });

}

// log a transaction request
const transact = (transaction) => {
  let ref = firebaseDB.ref("transactionRequests")
  ref.push(transaction); 
  ref = firebaseDB.ref(`users/${transaction.requestReciever}/pendingNotification`)
  ref.set(true);
}

// correctify email to be used as a key
const correctEmail = (email) => {
  let name = email.split("@")[0];
  name = name.replace(/\./g,"|");
  return name.toLowerCase();
}

// verify if such a user exists (return a promise)
const verifyUser = async (email) => {
  let ref = firebaseDB.ref("users/"+correctEmail(email) + "/userName")
  return ref.once("value");
}


export {
  correctEmail,
  initializeUser,
  verifyUser,
  transact
};