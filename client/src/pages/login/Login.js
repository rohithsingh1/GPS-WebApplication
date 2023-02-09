import React,{useState} from 'react'
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {ShowLoading,HideLoading} from '../../redux/alertsSlice'
import toast from "react-hot-toast";
import "../../resources/LoginAndRegister.css";
import postUserData from './loginApi';

function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [user, setUser]=useState({
    Email: "",
    Password: ""
  })
  const login=async (event) => {
     event.preventDefault()
     try {
      dispatch(ShowLoading())
       const response=await postUserData(user);
      dispatch(HideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
             localStorage.setItem("token", response.data.token);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
    } catch (error) {
     dispatch(HideLoading());
      toast.error(error);
      console.log("error in register form = ", error); 
    } 
  }
  return (
    <div className='container'>
      <div className='row loginRegisterRow'>
        <div>
          <h4>Login</h4>
          <form onSubmit={login}>
        <label htmlFor="Email" className='form-label'>Email</label>
        <input type="email" className='form-control'
          id='Email'
              value={user.Email}
              placeholder="test@gmail.com"
          onChange={(e) => setUser({...user, Email: e.target.value})} required />
        <label htmlFor="Password" className='form-label'>Password</label>
        <input type="password" className='form-control'
          id='Password'
              value={user.Password}
              placeholder="Test@123456"
          onChange={(e) => setUser({...user, Password: e.target.value})} required />
        <button type='submit' className='btn btn-primary mt-3 me-2'>Login</button>
        <button type='button' className='btn btn-secondary mt-3'
         onClick={()=>navigate("/register")}>Click Here To Register</button>
      </form>
        </div>
      </div>
    </div>
  )
}

export default Login