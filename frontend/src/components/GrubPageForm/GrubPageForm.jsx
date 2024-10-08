// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GrubPageForm.css";


function GrubPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleCancel = (e) => {
        e.preventDefault();
        nav(-1);  // This navigates back to the previous page
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <h1>GrubForm.jsx</h1>
    );
}

export default GrubPageForm;
