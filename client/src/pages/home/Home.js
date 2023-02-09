import React,{ useEffect, useState } from 'react'
import {useSelector } from "react-redux";
import GpsDataList from '../../components/GpsDataList';
import Pagination from '../../components/pagination/Pagination';
import "../../resources/home.css"

function Home() {
  const [sortTableFeilds, setSortTableFeilds]=useState({
    isDeviceIdSorted: false,
    isDeviceTypeSorted: false,
    isDeviceLocationSorted:false
  })
  const [searchKey, setSearchKey]=useState("");
  //let gpsData=undefined;
  let {gpsData}=useSelector((state) => {
    return state.gps;
  })
  let testGpsData = []
  testGpsData = useSelector((state) => {
    return state.gps;
  })
  if(gpsData===undefined) {
    gpsData = testGpsData
  }
  const [renderGpsData, setrenderGpsData]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage]=useState(5);
  const [totalPages,setTotalPages] = useState(1)

  
  const sortByDeviceId=() => {
    if(!sortTableFeilds.isDeviceIdSorted) {
      let sortArr = [...renderGpsData]
      sortArr.sort((a, b) => {
        let DeviceA=a.DeviceId
        let DeviceB = b.DeviceId
         return DeviceB.localeCompare(DeviceA)
      })
      setrenderGpsData(sortArr)
      setSortTableFeilds({...sortTableFeilds,isDeviceIdSorted:true})
    } else {
      const lastPostIndex=currentPage*postsPerPage;
    const firstPostIndex=lastPostIndex-postsPerPage;
      setrenderGpsData(gpsData.slice(firstPostIndex, lastPostIndex))
      setSortTableFeilds({...sortTableFeilds,isDeviceIdSorted:false})
    }
  }
   const sortByDeviceType=() => {
    if(!sortTableFeilds.isDeviceTypeSorted) {
      let sortArr = [...renderGpsData]
      sortArr.sort((a, b) => {
        let DeviceA=a.DeviceType
        let DeviceB = b.DeviceType
         return DeviceB.localeCompare(DeviceA)
      })
      setrenderGpsData(sortArr)
      setSortTableFeilds({...sortTableFeilds,isDeviceTypeSorted:true})
    } else {
      const lastPostIndex=currentPage*postsPerPage;
      const firstPostIndex=lastPostIndex-postsPerPage;
      setrenderGpsData(gpsData.slice(firstPostIndex, lastPostIndex))
      setSortTableFeilds({...sortTableFeilds,isDeviceTypeSorted:false})
    }
  }
  const sortByDeviceLocation=() => {
    if(!sortTableFeilds.isDeviceLocationSorted) {
      let sortArr = [...renderGpsData]
      sortArr.sort((a, b) => {
        let DeviceA=a.Location
        let DeviceB = b.Location
         return DeviceB.localeCompare(DeviceA)
      })
      setrenderGpsData(sortArr)
      setSortTableFeilds({...sortTableFeilds,isDeviceLocationSorted:true})
    } else {
      const lastPostIndex=currentPage*postsPerPage;
      const firstPostIndex=lastPostIndex-postsPerPage;
      setrenderGpsData(gpsData.slice(firstPostIndex, lastPostIndex))
      setSortTableFeilds({...sortTableFeilds,isDeviceLocationSorted:false})
    }
  }
  useEffect(() => {
    const lastPostIndex=currentPage*postsPerPage;
    const firstPostIndex=lastPostIndex-postsPerPage;
    
    if(searchKey!=="") {
      const tempGpsData=[];
      gpsData.forEach((data) => {
        if(JSON.stringify(data).toLowerCase().includes(searchKey)) {
          tempGpsData.push(data);
        }
      });
      setTotalPages(Math.ceil((tempGpsData.length)/postsPerPage))
      setrenderGpsData(tempGpsData.slice(firstPostIndex,lastPostIndex));
    } else {
      setTotalPages(Math.ceil((gpsData.length)/postsPerPage))
      setrenderGpsData(gpsData.slice(firstPostIndex, lastPostIndex));
    }
  }, [searchKey, gpsData,currentPage])
  

  return (
    <div className='homeDivRow'>
      <GpsDataList
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        renderGpsData={renderGpsData}
        sortByDeviceId={sortByDeviceId}
        sortByDeviceType={sortByDeviceType}
        sortByDeviceLocation={sortByDeviceLocation} />
      <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} />
   </div>
  )
}

export default Home