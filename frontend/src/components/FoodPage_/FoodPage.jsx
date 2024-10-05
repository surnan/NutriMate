import "./FoodPage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


function FoodPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  
  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1>!!  FoodPage.jsx  !!</h1>
    </>
  );
}

export default FoodPage;
