const express = require('express');
const { client } = require('../config/db'); // Import the MongoDB client

const router = express.Router();

// Fetch all companies
router.get('/companies', async (req, res) => {
    try {
        const companyCollection = client.db("test").collection("Companies");
        const companies = await companyCollection.find().toArray();
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send('Error fetching companies');
    }
});

module.exports = router;
