import React from 'react'
import {useNavigate} from "react-router-dom";
import GpsModal from './GpsModal';

function GpsDataList({searchKey,setSearchKey,sortByDeviceId,sortByDeviceType,sortByDeviceLocation, renderGpsData}) {
    const navigate=useNavigate()
    return (
      <div className='container-fluid' id='GpsClass'>
        <h2>GPS Summary</h2>
      <div className='row'>
        <div className='col-md-7 mb-3'>
          <input type="text" className='form-control'
            placeholder='search by Id,Type,Location'
          value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)} />
          </div>
           <div className='col mb-3'>
            <GpsModal/>
            </div> 
      </div>
      <div className='row'>
        <div className='col'>
          <div className='table-responsive'>
            <table className='table table-dark table-striped'>
              <thead>
                <tr>
                    <th scope="col">
                        DeviceId <i className="fa-solid fa-arrow-up" onClick={() => sortByDeviceId()}></i></th>
                    <th scope="col">
                        DeviceType <i className="fa-solid fa-arrow-up" onClick={() => sortByDeviceType()}></i></th>
                    <th scope="col">TimeStamp</th>
                    <th scope="col">
                        Location <i className="fa-solid fa-arrow-up" onClick={() => sortByDeviceLocation()}></i></th>
                  <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody className='table-group-divider'>
            {renderGpsData.map((gpsdata, gpsindex) => {
                   let localDateTime=gpsdata.Time;
                   let datetime=new Date(localDateTime).toLocaleString()
                   return (
                    <tr key={gpsindex}>
                       <td>{gpsdata.DeviceId}</td>
                       <td>{gpsdata.DeviceType}</td>
                       <td>{datetime}</td>
                       <td>{gpsdata.Location}</td>
                       <td onClick={() => {
                         navigate(`/device/${gpsdata.DeviceId}`)
                       }}><i className="fa-solid fa-arrow-right-long"></i></td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GpsDataList