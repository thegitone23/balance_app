const TransactionSchema = (from, to, payload) => {
  return {
    requestSender : from,
    requestReceiver : to,
    status : "PENDING",
    senderName : payload.senderName,
    receiverName : payload.receiverName,
    desc : payload.desc,
    amount : payload.amount,
    type : payload.type
  }
};

export default TransactionSchema;