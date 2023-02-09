import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {HideLoading,ShowLoading} from '../redux/alertsSlice'
import {SetUser} from '../redux/usersSlice';
import {SetGpsData} from '../redux/gpsSlice';
import DefaultLayout from './DefaultLayout';
import toast from "react-hot-toast";
import axios from 'axios';
import getGPSData from './gpsData/GpsDataApi';


function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [readyToRender, setReadyToRender]=useState(false);
   const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/users/get-user-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
      setReadyToRender(true);
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error);
      console.log("error in home page = ", error);
      setReadyToRender(true);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  const getUniqueGpsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/gps/show-data",
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
      if(response.data.success) {
      //  let sortedData=response.data.data.sort((a, b) => {
      //           let DeviceA=a.DeviceId
      //           let DeviceB = b.DeviceId
      //           return DeviceA.localeCompare(DeviceB)
      //         })
        dispatch(SetGpsData(response.data.data));
        dispatch(HideLoading());
      } else {
        dispatch(HideLoading());
        toast.error(response.data.message);
      }
      //setReadyToRender(true);
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error);
      //setReadyToRender(true);
      console.log("error in protected route", error);
    }
  }
   useEffect(() => {
     getUniqueGpsData();
  }, []);
  return (
    <div>{readyToRender&&<DefaultLayout>{children}</DefaultLayout>}</div>
  )
}
export default ProtectedRoute