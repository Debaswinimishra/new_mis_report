// import {
//   createBrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";
// import Fellows from "../pages/Fellows";
// import TimeSpendDetails from "../pages/TimeSpendDetails";
// import TrainingDetails from "../pages/TrainingDetails";
// import NsdcStatus from "../pages/NsdcStatus";
// import Home from "../Home";
// import Dashboard from "../pages/Dashboard";
// import PrivateRoute from "../components/PrivateRoute";
// // import Schools from "../pages/Schools";
// import Anganbadi from "../pages/Anganbadi";
// import PgeStudents from "../pages/PgeStudents";
// import EceStudents from "../pages/EceStudents";
// import Fln from "../pages/Fln";
// import PromotedStudent from "../pages/PromotedStudent";
// import Feedback from "../pages/Feedback";
// import Login from "../pages/LoginPage/Login";
// // import PromotedStudent from "../pages/PromotedStudent";
// import ComunityEducator from "../pages/ComunityEducator";
// import NewTraining from "../pages/TrainingModule/NewTraining";
// import CommonMonthlyQuiz from "../pages/CommonMonthlyQuiz/CommonMonthlyQuiz";

// const router = createBrowserRouter([{ path: "*", Component: Root }]);

// export default function AppRoute() {
//   return <RouterProvider router={router} />;
// }

// function Root() {
//   return (
//     <Routes>
//       <Route element={<PrivateRoute />}>
//         <Route path="/home" element={<Home />}>
//           <Route path="/home/dashboard" element={<Dashboard />} />
//           {/* <Route path="/home/fellows" element={<Fellows />} /> */}
//           <Route path="/home/TimeSpendDetails" element={<TimeSpendDetails />} />
//           <Route path="/home/TrainingDetails" element={<TrainingDetails />} />
//           <Route path="/home/NsdcStatus" element={<NsdcStatus />} />
//           {/* <Route path="/home/Schools" element={<Schools />} /> */}

//           <Route path="/home/Anganbadi" element={<Anganbadi />} />
//           <Route path="/home/PgeStudents" element={<PgeStudents />} />
//           <Route path="/home/EceStudents" element={<EceStudents />} />
//           <Route path="/home/Fln" element={<Fln />} />
//           <Route path="/home/PromotedStudent" element={<PromotedStudent />} />
//           <Route path="/home/Feedback" element={<Feedback />} />
//           <Route path="/home/ComunityEducator" element={<ComunityEducator />} />
//           <Route path="/home/NewTraining" element={<NewTraining />} />
//           <Route
//             path="/home/CommonMonthlyQuiz"
//             element={<CommonMonthlyQuiz />}
//           />
//         </Route>
//       </Route>
//       <Route path="/" element={<Login />} />
//     </Routes>
//   );
// }
import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
// import Route404 from "./Route404";

function RouteRoot() {
  return (
    <div>
      <RouteHome />
      <RouteAnganwadi />
      <RouteFellow />
      <RouteSchool />
      {/* <Route404 /> */}
    </div>
  );
}

export default RouteRoot;
