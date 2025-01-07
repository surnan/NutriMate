// backend/utils/scraper.js

const { chromium } = require('playwright');

async function scrapeNutrition(url) {
    try {
        console.log("Launching browser...");
        const browser = await chromium.launch();
        const page = await browser.newPage();

        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        console.log("Scraping nutritional data...");
        const nutritionData = await page.evaluate(() => {
            // Select all menu items
            return Array.from(document.querySelectorAll('.c-menu-card')).map(card => {
                // Extract name
                const name = card.querySelector('.t-display-5')?.innerText || 'Unknown';

                // Extract calories
                const caloriesElement = card.querySelector('.c-nutrition-line_stat:nth-child(1) .t-text-4');
                const calories = caloriesElement ? `${caloriesElement.innerText}` : 'N/A';

                // Extract protein 
                // Don't understand why child#3 instead of #2.  Trial & error
                const proteinElement = card.querySelector('.c-nutrition-line_stat:nth-child(3) .t-text-4');
                const protein = proteinElement ? `${proteinElement.innerText}` : 'N/A';

                return { name, calories, protein};
            });
        });

        await browser.close();
        console.log("Scraping completed successfully.");
        return nutritionData;
    } catch (error) {
        console.error("Error during scraping:", error);
        throw error;
    }
}

module.exports = scrapeNutrition;



/*
       return Array.from(document.querySelectorAll('.c-menu-card')).map(card => {
                // Extract name
                const name = card.querySelector('.t-display-5')?.innerText || 'Unknown';
                
                // Extract calories
                const caloriesElement = card.querySelector('.c-nutrition-line_stat:nth-child(1) .t-text-4');
                const calories = caloriesElement ? `${caloriesElement.innerText}` : 'N/A';

                const caloriesElement2 = card.querySelector('.c-nutrition-line_stat:nth-child(2) .t-text-4');
                const calories2 = caloriesElement2 ? `${caloriesElement2.innerText}` : 'N/A';

                // Extract protein
                const proteinElement = card.querySelector('.c-nutrition-line_stat:nth-child(3) .t-text-4');
                const protein = proteinElement ? `${proteinElement.innerText}` : 'N/A';

                const proteinElement4 = card.querySelector('.c-nutrition-line_stat:nth-child(4) .t-text-4');
                const protein2 = proteinElement4 ? `${proteinElement4.innerText}` : 'N/A';


                return { name,  calories, protein, calories2, protein2 };
            });

*/