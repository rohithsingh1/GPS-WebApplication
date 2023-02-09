import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({children}) {
  // const {user}=useSelector((state) => {
  //   return state.user;
  // })
  const navigate = useNavigate()
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default DefaultLayout