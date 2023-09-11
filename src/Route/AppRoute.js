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

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Fellows from "../pages/Fellows";
import TimeSpendDetails from "../pages/TimeSpendDetails";
import TrainingDetails from "../pages/TrainingDetails";
import NsdcStatus from "../pages/NsdcStatus";
import Home from "../Home";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
// import Schools from "../pages/Schools";
import Anganbadi from "../pages/Anganbadi";
import PgeStudents from "../pages/PgeStudents";
import EceStudents from "../pages/EceStudents";
import Fln from "../pages/Fln";
import PromotedStudent from "../pages/PromotedStudent";
import Feedback from "../pages/Feedback";
// import Login from "../pages/Login";
import Login from "../pages/LoginPage/Login";
// import PromotedStudent from "../pages/PromotedStudent";
import ComunityEducator from "../pages/ComunityEducator";
import DemoPage from "../pages/DemoPage";
import School1 from "../pages/School1";
import School2 from "../pages/School2";
import FellowRoute from "./FellowRoute";
const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/demopage" element={<DemoPage />} />
      <Route path="/home" element={<PrivateRoute />}>
        <Route path="/home/dashboard" element={<Dashboard />} />
        <Route path="/home/fellows/*" element={<FellowsRoutes />} />
        <Route path="/home/school/*" element={<SchoolRoutes />} />
      </Route>
    </Routes>
  );
}

function FellowsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FellowRoute />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="fellows" element={<Fellows />} />
      <Route path="ComunityEducator" element={<ComunityEducator />} />
    </Routes>

    //   <Routes>
    //   <Route element={<PrivateRoute />}>
    //     <Route path="/home" element={<Home />}>
    //       <Route path="/home/dashboard" element={<Dashboard />} />
    //       <Route path="/home/fellows" element={<Fellows />} />
    //       <Route path="/home/TimeSpendDetails" element={<TimeSpendDetails />} />
    //       <Route path="/home/TrainingDetails" element={<TrainingDetails />} />
    //       <Route path="/home/NsdcStatus" element={<NsdcStatus />} />
    //       {/* <Route path="/home/Schools" element={<Schools />} /> */}

    //       <Route path="/home/Anganbadi" element={<Anganbadi />} />
    //       <Route path="/home/PgeStudents" element={<PgeStudents />} />
    //       <Route path="/home/EceStudents" element={<EceStudents />} />
    //       <Route path="/home/Fln" element={<Fln />} />
    //       <Route path="/home/PromotedStudent" element={<PromotedStudent />} />
    //       <Route path="/home/Feedback" element={<Feedback />} />

    //     </Route>
    //   </Route>

    // </Routes>
  );
}

function SchoolRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<School1 />} /> */}
      <Route path="/school" element={<School1 />} />
      <Route path="/school2" element={<School2 />} />
    </Routes>
  );
}
