const TransactionSchema = (from, to, payload) => {
  return {
    requestSender : from,
    requestReciever : to,
    status : "PENDING",
    msg : payload.msg,
    ammount : payload.ammount
  }
};

export default TransactionSchema;