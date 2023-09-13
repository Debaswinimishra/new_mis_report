import { Routes, Route } from "react-router-dom";


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
