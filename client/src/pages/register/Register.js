import React,{useState} from 'react'
import {useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {ShowLoading,HideLoading} from '../../redux/alertsSlice'
import validator from 'validator';
import toast from "react-hot-toast";
import "../../resources/LoginAndRegister.css";
import postUserData from './registerApi';

function Register() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [user, setUser]=useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword:""
  })
  const register=async (event) => {
    event.preventDefault()
    try {
      let nameValid = validator.isAlphanumeric(user.Name)
    let emailValid = validator.isEmail(user.Email)
    let PasswordMatch=user.Password===user.ConfirmPassword;
      let PasswordIsStrong=validator.isStrongPassword(user.Password)
    if(!PasswordMatch) {
      toast.error("password doesnot match");
    }
    else if(!emailValid) {
      toast.error('invalid Email Address');
    }
    else if(!nameValid || user.Name.length<3) {
      toast.error("username should have atleast 3 characters and contains only alphabets and numbers");
      }
    else if(!PasswordIsStrong) {
      toast.error('Your password must be 8-20 characters long, contain atleast one uppercase character,number and special characters.');
    }
    else {
      dispatch(ShowLoading())
      const response=await postUserData(user)
      dispatch(HideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/login");
          } else {
            toast.error(response.data.message);
          }
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
          <h4>Register</h4>
           <form onSubmit={register}>
         <label htmlFor="Name" className='form-label'>Name</label>
        <input type="text" className='form-control'
              id='Name'
              placeholder='rohith'
          value={user.Name}
              onChange={(e) => setUser({...user, Name: e.target.value})} required />
            
        <label htmlFor="Email" className='form-label'>Email</label>
        <input type="email" className='form-control'
              id='Email'
              placeholder='example@gmail.com'
          value={user.Email}
              onChange={(e) => setUser({...user, Email: e.target.value})} required />
        <label htmlFor="Password" className='form-label'>Password</label>
        <input type="password" className='form-control'
              id='Password'
              placeholder='Test@123456'
          value={user.Password}
              onChange={(e) => setUser({...user, Password: e.target.value})} required />
            
        <div id="passwordHelpBlock" className="form-text text-white">
          Your password must be 8-20 characters long, contain atleast one uppercase character,number and special characters. 
            </div>
            
        <label htmlFor="ConfirmPassword" className='form-label'>ConfirmPassword</label>
        <input type="password" className='form-control'
              id='ConfirmPassword'
              placeholder='Test@123456'
          value={user.ConfirmPassword}
          onChange={(e) => setUser({...user, ConfirmPassword: e.target.value})} required />
        <button type='submit' className='btn btn-primary mt-3 me-2'>Register</button>
        <button type='button' className='btn btn-secondary mt-3'
         onClick={()=>navigate("/login")}>Click Here To Login</button>
      </form>
        </div>
      </div>
    </div>
  )
}

export default Register