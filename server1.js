const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const uri = "mongodb+srv://himanshichaturvedi2005:kLOUEPtQQCdSOrUK@cluster0.sqs5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Your MongoDB URI
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Call the function to connect to the database
connectToDatabase();
    // Endpoint to fetch job listings
    app.get('/api/post-jobs', async (req, res) => {
        try {        const jobCollection = client.db("test").collection("joblistings");
            const jobs = await jobCollection.find().toArray();
            res.json(jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            res.status(500).send('Error fetching jobs');
        }
    });

    // Endpoint to post new job listings (already implemented)
    app.post('/api/post-jobs', async (req, res) => {
        const newJob = req.body; // Expecting job data in the request body
        console.log('Received job data:', newJob); // Log the received data
        try {
            const jobCollection = client.db("test").collection("joblistings"); // Replace with your collection name
            const result = await jobCollection.insertOne(newJob);
            
            // Access the inserted ID directly from the result
            const insertedJob = { _id: result.insertedId, ...newJob }; // Include the inserted ID in the response
            console.log('Job inserted:', insertedJob); // Log the inserted job
            res.status(201).json(insertedJob); // Respond with the created job
        } catch (error) {
            console.error('Error posting job:', error); // Log the error
            res.status(500).send('Error posting job'); // Send a 500 response
        }
    });
    // Endpoint to fetch companies
app.get('/api/companies', async (req, res) => {
    try {
        const companyCollection = client.db("test").collection("Companies"); // Replace with your collection name
        const companies = await companyCollection.find().toArray();
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send('Error fetching companies');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});