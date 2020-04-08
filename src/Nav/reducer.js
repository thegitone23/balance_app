const NavbarReducer = (state = {} , action) => {

  switch(action.type) {
    case 'Signed_In':
      return  {...state, authenticated : true, userName : action.userName, email : action.email}
    case 'Signed_Out':
      return {...state, authenticated : false, userName : undefined, email : undefined};
    default:
      return {...state};
      
  }
};

export default NavbarReducer;