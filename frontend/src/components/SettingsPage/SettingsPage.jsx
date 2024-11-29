// frontend/src/components/SettingsPage/SettingsPage.jsx

import "./SettingsPage.css";
import { csrfFetch } from "../../redux/csrf";

import { useSelector } from "react-redux";
import { useState } from 'react';

const SettingsPage = () => {
    const [scrapedData, setScrapedData] = useState(null);

    const sessionUser = useSelector((state) => state.session.user);

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
            alert("An error occurred during import.");
        }
    };


return (
        <div>
            <br />
            <h2>Settings Page</h2>
            <h3>Email = {sessionUser?.email}</h3>
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