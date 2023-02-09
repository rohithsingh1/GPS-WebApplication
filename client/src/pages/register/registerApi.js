import axios  from "axios";

async function postUserData(userobj) {
   const response = await axios.post("/api/users/register", userobj);
  return response;
}

export default postUserData