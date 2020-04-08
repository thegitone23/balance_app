const UserSchema = (email,userName) => {
  return {
    email,
    userName,
    balance : 0,
    pendingNotification : false,
    preferences : false
  }
};

export default UserSchema;