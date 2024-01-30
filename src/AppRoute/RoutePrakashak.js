import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PrakashakRoot from "../Pages/Prakashak";
import Dashboard from "../Pages/Prakashak/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RemoteInstruction from "../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
import WhatsappChatbot from "../Pages/Prakashak/WhatsappChatbot/WhatsappChatbot";
import Schoolwise from "../Pages/Prakashak/Schoolwise/Schoolwise";
import Classwise from "../Pages/Prakashak/Classwise/Classwise";
const RoutePrakashak = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  return (
    <Routes>
      <Route
        path="/prakashak/*"
        element={<PrivateRoute element={<PrakashakRoot />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="remote_instructions" element={<RemoteInstruction />} />
        <Route path="whatsapp_chatbot" element={<WhatsappChatbot />} />
        <Route path="school_wise" element={<Schoolwise />} />
        <Route path="class_wise" element={<Classwise />} />
      </Route>
    </Routes>
  );
};
export default RoutePrakashak;
