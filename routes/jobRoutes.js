const express = require('express');
const { ObjectId } = require('mongodb');
const { client } = require('../config/db'); // Import the MongoDB client

const router = express.Router();

// Fetch all job listings
router.get('/post-jobs', async (req, res) => {
    try {
        const jobCollection = client.db("test").collection("joblistings");
        const jobs = await jobCollection.find().toArray();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
    }
});

// Post a new job listing
router.post('/post-jobs', async (req, res) => {
    const newJob = req.body;
    try {
        const jobCollection = client.db("test").collection("joblistings");
        const result = await jobCollection.insertOne(newJob);
        const insertedJob = { _id: result.insertedId, ...newJob };
        res.status(201).json(insertedJob);
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).send('Error posting job');
    }
});

// Fetch a job by ID
router.get('/post-jobs/:id', async (req, res) => {
    const jobId = req.params.id;
    try {
        const jobCollection = client.db("test").collection("joblistings");
        const job = await jobCollection.findOne({ _id: new ObjectId(jobId) });
        res.json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).send('Error fetching job');
    }
});

module.exports = router;
