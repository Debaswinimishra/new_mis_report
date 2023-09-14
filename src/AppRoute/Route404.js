import { Routes, Route } from "react-router-dom";

import PageNotFound from "../Pages/Home/PageNotFound";

function Route404() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default Route404;
