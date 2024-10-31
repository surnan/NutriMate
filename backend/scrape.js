require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');
const pdf = require('pdf-parse');
const { Client } = require('pg');
const path = require('path');

// Database client setup
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432, //port=8000 ?
});

// Define the URL of the PDF
const pdfUrl = 'https://fcs.osu.edu/sites/fcs/files/imce/PDFs/mcdonalds-nutrition-facts.pdf';
const downloadPath = path.join(__dirname, 'mcdonalds-nutrition-facts.pdf');

async function downloadPdf() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(pdfUrl);
  const pdfBuffer = await page.evaluate(async (url) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  }, pdfUrl);


  fs.writeFileSync(downloadPath, pdfBuffer);
  console.log('...function downloadPdf->fs.writeFileSync complete!!');
  await browser.close();
  

  await extractDataFromPdf(downloadPath);
}

async function extractDataFromPdf(pdfPath) {
  console.log('...function extractDataFromPdf-> start !!');
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  const lines = data.text.split('\n');

  // Process the lines and insert into the database
  await client.connect();
  
  try {
    for (const line of lines) {
      // Example line: "Big Mac | 550 | 30g | 45g | 25g | 3g"
      const parts = line.split('|').map(part => part.trim());
      if (parts.length >= 5) { // Ensure we have enough parts
        const name = parts[0];
        const calories = parseFloat(parts[1]);
        const [servingSize, servingUnit] = parts[2].split(' ');
        const fats = parseFloat(parts[3]);
        const protein = parseFloat(parts[4]);
        const carbs = parseFloat(parts[5]);
        const sugar = parts.length > 6 ? parseFloat(parts[6]) : 0; // Default to 0 if not present

        // Insert data into the GrubScrape table
        await client.query(
          'INSERT INTO GrubScrape (name, servingSize, servingUnit, fats, protein, carbs, sugar, calories) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [name, servingSize, servingUnit, fats, protein, carbs, sugar, calories]
        );
      }
    }

    console.log('Data successfully fetched and stored!');
  } catch (error) {
    console.error('Error fetching or inserting data:', error);
  } finally {
    await client.end();
  }
}

// Start the process
downloadPdf();
