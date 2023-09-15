import { Routes, Route } from "react-router-dom";


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
