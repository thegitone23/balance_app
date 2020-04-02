const SignedInAction  = (userName, email) => {
  return {type : "Signed_In", userName, email};
}

const SignedOutAction = () => {
  return {type : "Signed_Out"};
}

export {SignedInAction, SignedOutAction};