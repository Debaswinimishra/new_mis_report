import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../pages/Fellow";
import CommonMonthlyQuiz from "../pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
import CommunityEducator from "../pages/Fellow/CommunityEducator/CommunityEducator";
import NewTraining from "../pages/Fellow/NewTraining/NewTraining";
import Module4 from "../pages/Fellow/Module4/Module4";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";

const RouteFellow = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  if (isLoggedin === "true") {
    return (
      <Routes>
        <Route path="/fellow" element={<FellowRoot />}>
          <Route index element={<CommonMonthlyQuiz />} />
          <Route path="module4" element={<FellowDashboard />} />
          <Route path="commonmonthlyquiz" element={<CommonMonthlyQuiz />} />
          <Route path="communityeducator" element={<CommunityEducator />} />
          <Route path="newtraining" element={<NewTraining />} />
        </Route>
      </Routes>
    );
  } else {
    // Redirect to the home page if not logged in
    return <navigate to="*" />;
  }
};
export default RouteFellow;
