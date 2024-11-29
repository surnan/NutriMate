// backend/routes/scraper.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const scrapeNutrition = require('../../utils/scraper');

const router = express.Router();



router.get('/', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('/routes ---> Hello World! -1');
});


router.post('/', async (req, res) => {
    const { url } = req.body; // Pass the URL to scrape in the request body
    try {
        console.log("////")
        console.log("////")
        console.log("AAAA")
        const data = await scrapeNutrition(url);
        console.log("////")
        console.log("////")
        console.log("BBBB")
        res.status(200).json({ success: true, data });
        console.log("////")
        console.log("////")
        console.log("CCCC")
    } catch (error) {
        console.error("Error during scraping:", error);
        console.log("****")
        console.log("****")
        console.log("dddd")
        console.log("****")
        console.log("****")
        res.status(500).json({ success: false, message: 'Scraping failed', error: error.message });
    }
});

module.exports = router;
