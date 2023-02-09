import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.js";
import DevicePage from "./pages/devicePage/DevicePage";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import {useSelector} from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const {loading}=useSelector((state) => {
    return state.alerts;
  })
  return (
    <div>
      {loading&&<Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          {/* <Route path="/" element={<Home />}></Route> */}
    
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}></Route>
          {/* <Route path="/register" element={<Register />}></Route> */}
    
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>
          {/* <Route path="/login" element={<Login />}></Route> */}

          <Route path="/device/:deviceId" element={<ProtectedRoute><DevicePage /></ProtectedRoute>}></Route>
          {/* <Route path="/device/:deviceId" element={<DevicePage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
