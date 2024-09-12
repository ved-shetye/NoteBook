import React from 'react'

export default function Alert(props) {
  const {alert} = props;
  const status = alert.status;
  // console.log(status);
  // const alertOff = ()=>{
  //   setAlert(false);
  // }
  return (
     <>
     {alert && 
     <div className={`${status?"bg-green-400":"bg-red-400"} p-2 absolute flex w-full justify-center mx-auto rounded-b-lg  space-x-20`}>
      <div>{status?"Success":"Error"} ! : {alert.message}</div>
      {/* <i className="fa-solid fa-circle-xmark fa-2xl my-auto hover:cursor-pointer" onClick={alertOff}></i> */}
     </div>

     }
</>
  )
}
