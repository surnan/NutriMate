import "./WorkPage.css";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function WorkPage() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  
  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1>!!  WorkPage.jsx  !!</h1>
    </>
  );
}

export default WorkPage;
