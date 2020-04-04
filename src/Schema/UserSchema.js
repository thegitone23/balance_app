const UserSchema = (email,userName) => {
  return {
    email,
    userName,
    balance : 0,
    transactionsPending : false,
    transactionsCompleted : false,
    preferences : false
  }
};

export default UserSchema;