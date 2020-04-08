
const HomeReducer =  (state, action) => {
  console.log(state)
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