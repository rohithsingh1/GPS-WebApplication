import axios  from "axios";

async function getGPSData() {
   const response = await axios.post(
        "/api/gps/show-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  return response;
}


export default getGPSData