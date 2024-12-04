// frontend/src/components/SettingsPage/SettingsPage.jsx

import "./SettingsPage.css";
import { csrfFetch } from "../../redux/csrf";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { updateUserThunk } from '../../redux/session';

const SettingsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [scrapedData, setScrapedData] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const { theme, toggleTheme, showProtein, toggleShowProtein, showCarbs, toggleShowCarbs, showFats, toggleShowFats, showSugars, toggleShowSugars,
        timeValue, updateTimeValue
     } = useTheme();
    const [imgUrl, setImgUrl] = useState("");
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");

    // AWS
    const handleImgClick = () => {
        console.log("click image")
        setShowSelect(!showSelect)
        console.log("showSelect = ", showSelect)
    }

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

    const handleTimeChange = (e) => {
        updateTimeValue(e.target.value);
    };



    useEffect(() => {
        console.log(`Theme ===> `, theme)
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
    }, [theme])

    return (
        <div className={`
            mainBodyStyle settingsPageFlex
            ${theme === "dark" ? "dkBody smoke_font" : ""}
            `}>
            <br />
            <h1>SettingsPage.jsx</h1>
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
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="protein-toggle"
                    checked={showProtein}
                    onChange={toggleShowProtein}
                />
                <label htmlFor="protein-toggle" className="toggle-label">
                    <span className="toggle-slider" />
                </label>
                <p>Show Protein: {showProtein ? 'Yes' : 'No'}</p>
            </div>

            <br />
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="carbs-toggle"
                    checked={showCarbs}
                    onChange={toggleShowCarbs}
                />
                <label htmlFor="carbs-toggle" className="toggle-label">
                    <span className="toggle-slider" />
                </label>
                <p>Show Carbs: {showCarbs ? 'Yes' : 'No'}</p>
            </div>

            <br />
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="fats-toggle"
                    checked={showFats}
                    onChange={toggleShowFats}
                />
                <label htmlFor="fats-toggle" className="toggle-label">
                    <span className="toggle-slider" />
                </label>
                <p>Show Fats: {showFats ? 'Yes' : 'No'}</p>
            </div>

            <br />
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="sugars-toggle"
                    checked={showSugars}
                    onChange={toggleShowSugars}
                />
                <label htmlFor="sugars-toggle" className="toggle-label">
                    <span className="toggle-slider" />
                </label>
                <p>Show Sugars: {showSugars ? 'Yes' : 'No'}</p>
            </div>


            <p>Time:</p>
            <input
                className="_input"
                type="time"
                name="timestamp"
                value={timeValue}
                onChange={handleTimeChange}
            />


            <br />
            <button onClick={handleScrape} className="_button black_font settingsBtn">
                SCRAP <strong>JustSalad.com</strong>
            </button>
            <br />
            <button onClick={handleBulkImport} className="_button black_font settingsBtn">
                &nbsp;&nbsp;Import Data to Grubs Table&nbsp;&nbsp;
            </button>
            <br />
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
            <br />
            <h3>Click Image to change Profile Picture</h3>
            <br />
            <div>
                <img
                    className="round clickable"
                    style={{ height: "300px", width: "300px" }}
                    src={sessionUser.profileImg}
                    onClick={handleImgClick}
                />
            </div>
            <br />
            <div className="center">
                <br />
                <br />
                {showSelect && showUpload && (
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

