// frontend/src/components/SettingsPage/SettingsPage.jsx

import "./SettingsPage.css";
import { csrfFetch } from "../../redux/csrf";

import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { useTheme } from "../../context/ThemeContext"

const SettingsPage = () => {
    const [scrapedData, setScrapedData] = useState(null);

    const sessionUser = useSelector((state) => state.session.user);
    const { theme, toggleTheme } = useTheme();






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
        <div className={`mainBodyStyle ${theme === "dark" ? "dkBody smoke_font" : ""}`}>
            <br />
            <h2>Settings Page</h2>
            <h3>Email = {sessionUser?.email}</h3>
            <br />
            <p
                className={`TEST-ELEMENT center ${theme === "dkBody" ? "red white_font" : ""}`}
            >
                {`Theme = ${theme}`}
            </p>




            <br />
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
            <br />
            <div class="time-picker">
                <label for="time">Choose a time:</label>
                <input type="time" id="time" name="time" required/>
            </div>

            <br />
            <br />



            <br />
            {/* Button to trigger scraping */}
            <button onClick={handleScrape} className="_button black_font">
                &nbsp;&nbsp;Scrape Nutrition Data&nbsp;&nbsp;
            </button>
            <br />
            <br />
            {/* Button to trigger bulk import */}
            <button onClick={handleBulkImport} className="_button black_font">
                &nbsp;&nbsp;Import Data to Grubs Table&nbsp;&nbsp;
            </button>

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
        </div>
    );
};

export default SettingsPage;

