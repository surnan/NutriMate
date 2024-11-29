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
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error fetching scraped data:", error);
        }
    };

    return (
        <div>
            <br/>
            <h2>Settings Page</h2>
            <h3 >Email = {sessionUser?.email}</h3>
            <br/>
            <button
                onClick={handleScrape}
                className="_button black_font"
            >
                &nbsp;&nbsp;Scrape Nutrition Data&nbsp;&nbsp;
            </button>

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