// frontend/src/components/GrubPage/GrubPage.jsx

import "./GrubPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGrubsAllThunk } from "../../redux/grubs";
import { useNavigate } from "react-router-dom"
import GrubCard from "../GrubCard/GrubCard";
import SearchBar from "../SearchBar";

const GrubPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);
  const grubArr = useSelector(state => state.grubs.allGrubs);
  const [searchQuery, setSearchQuery] = useState("");
  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };


  const filteredAndSortedArray = grubArr
    .filter(
      grub => grub.userId === sessionUser.id &&
      grub.name.toLowerCase().includes(searchQuery) 
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  useEffect(() => {
    dispatch(getGrubsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, grub) => {
    e.preventDefault();
    nav('/grubform', { state: { newGrub: true, currentData: grub } });
  }

  const handleNewGrub = () => { nav('/grubform') }
  const handleBackBtn = () => { nav(-1) };

  return (
    <div className="mainBodyStyle">
      <h1> GrubPage.jsx </h1>
      <h3 >Email = {sessionUser?.email}</h3>

      <div className="max_HFlex grub_btn_div">
        <button
          className="blue _button"
          type="button"
          onClick={handleBackBtn}
        >
          BACK
        </button>
        <button
          className="green _button"
          onClick={handleNewGrub}
        >CREATE
        </button>
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Search Grubs..." />
      <h4 className="red_font center twenty_padding">Click Card below for Update/Delete</h4>
      <div className="grub_page_grid">
        {
          filteredAndSortedArray.map((grub, idx) => (
            <div
              key={`${idx}-grub`}
              onClick={e => somethingDifferent(e, grub)}
            >
              <GrubCard grub={grub} />
              <br />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default GrubPage;