import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ShowLoading, HideLoading} from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import Chart from 'react-apexcharts';
import '../../resources/DevicePage.css';

function DevicePage() {
  const params=useParams();
  console.log(params)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [Device, setDevice]=useState([]);
  const [piechart, setPiechart]=useState({
    n1: 0,
    piechartdata: [],
    piechartlabel: []
  })
  const getDevices = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/gps/show-device-data`,
        {
          "DeviceId": params.deviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if(response.data.success) {
        setDevice(response.data.data);
      } else {
        toast.error(response.data.message.name);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const setPieChartInfo=(Device) => {
    let n1, piechartdata, piechartlabel, map1=new Map();
    n1= 100/Device.length;
    for(let ele of Device) {
          if(map1.has(ele.Location)) {
            map1.set(ele.Location,map1.get(ele.Location)+1)
          } else {
            map1.set(ele.Location,1)
          }
    }
    piechartdata=Array.from(map1.values())
    piechartlabel=Array.from(map1.keys())
    piechartdata =  piechartdata.map((ele) => {
          return ele*n1;
    })
    setPiechart({
      n1,
      piechartdata,
      piechartlabel
    })
  }
  
  useEffect(() => {
    getDevices();
  }, []);

  useEffect(() => {
    setPieChartInfo(Device);
  },[Device])





  return (
    <div className="bg-dark text-white" id="devicePageOuterDiv">
      {
        Device&&(
          <div className='container-fluid'>
              <div className="row" id="devicepageRow">
              <div className="col-12">
                <button className="btn btn-secondary" onClick={() => {
                  navigate('/')
                }}>Back</button>
                      <h3>{Device[0]?.DeviceId}</h3>
                      <h4>{Device[0]?.DeviceType}</h4>
                </div>
              <div className="col-md-6">
                      <div className='table-responsive'>
                          <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                  <th scope="col">TimeStamp</th>
                                  <th scope="col">Location</th>
                                </tr>
                              </thead>
                            <tbody className='table-group-divider'>
                              {Device.map((gpsdata, gpsindex) => {
                                  let localDateTime=gpsdata.Timestamp;
                                  let datetime=new Date(localDateTime).toLocaleString()
                                  return (
                                    <tr key={gpsindex}>
                                    <td>{datetime}</td>
                                    <td>{gpsdata.Location}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                        </div>
                      </div>
                  <div className="col">
                    <Chart
                      type="pie"
                      width={340}
                      height={450}
                      series={piechart.piechartdata}
                      options={
                         {
                            labels:piechart.piechartlabel
                          }
                      }></Chart>
                      </div>
            </div>
      </div>
        )
      }
    </div>
  )
}

export default DevicePage















