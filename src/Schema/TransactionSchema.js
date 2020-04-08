const TransactionSchema = (from, to, payload) => {
  return {
    requestSender : from,
    requestReciever : to,
    status : "PENDING",
    desc : payload.desc,
    amount : payload.amount,
    type : payload.type
  }
};

export default TransactionSchema;