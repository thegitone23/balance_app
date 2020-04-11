
const HomeReducer =  (state, action) => {
  switch(action.type) {
    case  "Transaction_Request" :
      return {...state, logPayment : false}
    case "Toggle_Log":
      let prevState = {...state}
      return {...state, logPayment : !prevState.logPayment}
    default :
      return {...state} 
  }
}

export default HomeReducer