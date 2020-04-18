const NavbarReducer = (state = {} , action) => {

  switch(action.type) {
    case 'Signed_In':
      // firebaseDB.ref(`users/${correctEmail(action.email)}/pendingNotification`).on("value",(snapshot) => {
      //   if(snapshot.val() == True)
      //   {
      //     return  {...state, authenticated : true, userName : action.userName, email : action.email, pendingNotification : true}
      //   }
      // })
      return  {...state, authenticated : true, userName : action.userName, email : action.email}

    case 'Signed_Out':
      return {...state, authenticated : false, userName : undefined, email : undefined};
    default:
      return {...state};
      
  }
};

export default NavbarReducer;