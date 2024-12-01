// frontend/src/components/SettingsPage/SettingsPage.jsx

import "./SettingsPage.css";
import { csrfFetch } from "../../redux/csrf";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

import { useTheme } from "../../context/ThemeContext";

import { updateUserThunk } from '../../redux/session';


const SettingsPage = () => {
    const [scrapedData, setScrapedData] = useState(null);
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const { theme, toggleTheme } = useTheme();

    const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");



    const updatedImgFromPC = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setPreviewUrl(reader.result)
        setImgUrl(file);
        setShowUpload(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const img_url = imgUrl;
        const form = { img_url };
        await dispatch(updateUserThunk(sessionUser.id, form))
        setImgUrl("");
        setShowUpload(true);
        setPreviewUrl("");
    }



    const handleScrape = async () => {
        const url = 'https://www.justsalad.com/';
        try {
            // const response = await fetch('/api/scraper/scrape', {
            const response = await csrfFetch('/api/scraper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            if (data.success) {
                console.log("Scraped Data:", data.data);
                setScrapedData(data.data);
                alert("Scraping completed successfully!");
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error fetching scraped data:", error);
            alert("Scraping failed.");
        }
    };

    // Function to handle bulk import
    const handleBulkImport = async () => {
        try {
            const response = await csrfFetch("/api/grubs/import-scraped-data", {
                method: "POST",
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Bulk Import Success:", data);
                alert("Data imported successfully into Grubs table!");
            } else {
                console.error("Error during bulk import:", data.message);
                alert("Import failed. See console for details.");
            }
        } catch (error) {
            console.error("Error importing data:", error);
            if (error instanceof Response) {
                try {
                    const errorData = await error.json();
                    console.error("Parsed error data:", errorData);
                    alert(`An error occurred: ${errorData.message}`);
                } catch (jsonError) {
                    console.error("Failed to parse error response:", jsonError);
                    alert("An unexpected error occurred during import.");
                }
            } else {
                alert("An unexpected error occurred during import.");
            }
        }
    };


    useEffect(() => {
        console.log(`Theme ===> `, theme)
    }, [theme])


    return (
        <div className={`
            mainBodyStyle settingsPageFlex
            ${theme === "dark" ? "dkBody smoke_font" : ""}
            `}>
            <br />
            <h2>Settings Page</h2>
            <h3>Name = {sessionUser.username}</h3>
            <h3>Email = {sessionUser?.email}</h3>
            <br />
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                />
                <label htmlFor="theme-toggle" className="toggle-label">
                    <span className="toggle-slider" />
                </label>
                <p>Current Theme: {theme}</p>
            </div>
            <br />
            {/* Button to trigger scraping */}
            <button onClick={handleScrape} className="_button black_font">
                SCRAP <strong>JustSalad.com</strong>
            </button>
            <br />
            {/* Button to trigger bulk import */}
            <button onClick={handleBulkImport} className="_button black_font">
                &nbsp;&nbsp;Import Data to Grubs Table&nbsp;&nbsp;
            </button>
            <br />
            {/* Display scraped data */}
            {scrapedData && (
                <div>
                    <h3>Scraped Data:</h3>
                    <ul>
                        {scrapedData.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong>: {item.calories} calories, {item.protein} protein
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <br/>
            <div>
                <img
                    className="round"
                    style={{ height: "300px", width: "300px" }}
                    src={sessionUser.profileImg}
                />
            </div>
            <br />
            <div className="center">
                <h3>Change Your Profile Picture</h3>
                <br />
                <br />
                {showUpload && (
                    <label htmlFor='file-upload'> Select From Computer
                        <input
                            type='file'
                            id='file-upload'
                            name="img_url"
                            onChange={updatedImgFromPC}
                            accept='.jpg, .jpeg, .png, .gif'
                        />
                    </label>
                )}
                <br /><br /><br /><br />
                {!showUpload && (
                    <div className="vertical_center_flex">
                        <img
                            src={previewUrl}
                            alt="preview"
                            style={{ height: "300px", width: "300px" }}
                            className="round"
                        />
                        <button
                            onClick={handleSubmit}
                            className="_button black block twenty_margin"
                        >
                            Change Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;

