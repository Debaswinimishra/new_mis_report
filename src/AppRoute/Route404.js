import { Routes, Route } from "react-router-dom";

import PageNotFound from "../Pages/Home/PageNotFound";

function Route404() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default Route404;
