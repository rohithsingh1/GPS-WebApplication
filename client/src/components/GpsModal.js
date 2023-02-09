import React, {useState} from 'react'
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ShowLoading,HideLoading} from '../redux/alertsSlice'
import toast from "react-hot-toast";
import {SetGpsData} from '../redux/gpsSlice';


function GpsModal() {
    const dispatch=useDispatch()
  const navigate=useNavigate()
  let initialState={
     DeviceId: "",
        DeviceType: "",
        Timestamp: "",
        Location:""
  }
    const [GPSData, setGPSData]=useState(initialState)

    const AddGPSData=async () => {
        try {
             dispatch(ShowLoading())
          const AddGPSresponse=await axios.post("/api/gps/add-gps-data", GPSData,
            {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
            }
          );
          setGPSData(initialState)
      dispatch(HideLoading());
            if(AddGPSresponse.data.success) {
              toast.success(AddGPSresponse.data.message);
              // let sortedData=AddGPSresponse.data.data.sort((a, b) => {
              //   let DeviceA=a.DeviceId
              //   let DeviceB = b.DeviceId
              //   return DeviceA.localeCompare(DeviceB)
              // })
                dispatch(SetGpsData(AddGPSresponse.data.data));
             navigate('/')
          } else {
            toast.error(AddGPSresponse.data.message);
          }
        } catch (error) {
            dispatch(HideLoading());
      toast.error(error);
      console.log("error in modal = ", error); 
        }
    }
    return (
      
        <>
            <button type="button" className="btn btn-outline-info float-end" data-bs-toggle="modal" data-bs-target="#GPSDataModal">Add Data</button>
            <div className="modal fade" id="GPSDataModal"
              data-bs-backdrop="static" data-bs-keyboard="false"
              tabIndex="-1" aria-labelledby="GPSDataModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="GPSDataModalLabel">Add GPS Data</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-1">
            <label htmlFor="DeviceId" className="col-form-label">DeviceId:</label>
                        <input type="text" className="form-control"
                          id="DeviceId" style={{width: "100%"}}
                                        placeholder="D-1575"
                                        value={GPSData.DeviceId}
                                        onChange={(e) => setGPSData({...GPSData, DeviceId: e.target.value})}
                                        required />
          </div>
          <div className="mb-1">
            <label htmlFor="DeviceType" className="col-form-label">DeviceType:</label>
                        <input type="text" className="form-control"
                          id="DeviceType"
                                        placeholder='Phone'
                                        value={GPSData.DeviceType}
                                        onChange={(e) => setGPSData({...GPSData, DeviceType: e.target.value})}
                                        style={{width: "100%"}} required />
                      </div>
            <div className="mb-1">
            <label htmlFor="DateTime" className="col-form-label">Timestamp:</label>
                                    <input type="datetime-local" className="form-control" id="DateTime"
                                        
                                        onChange={(e) => {
                                            let date=new Date(e.target.value).toISOString()
                                            setGPSData({...GPSData,Timestamp:date})
                                        }}
                                        style={{width: "100%"}} required />
                      </div>
                      <div className="mb-1">
            <label htmlFor="Location" className="col-form-label">Location:</label>
                        <input type="text" className="form-control"
                                        placeholder='L6' id="Location"
                                        value={GPSData.Location}
                                        onChange={(e) => setGPSData({...GPSData, Location: e.target.value})}
                                        style={{width: "100%"}} required />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={AddGPSData} data-bs-dismiss="modal" aria-label="Close" >Submit Data</button>
      </div>
    </div>
  </div>
</div></>
  )
}

export default GpsModal