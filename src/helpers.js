// create user in firebase if loggen in for first time
const initializeUser = (user, firebaseDB, UserSchema) => {

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



// correctify email to be used as a key
const correctEmail = (email) => {
  let name = email.split("@")[0];
  name = name.replace(/\./g,"|");
  return name;
}

export {
  correctEmail,
  initializeUser
};