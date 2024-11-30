const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors()); // Use CORS to allow requests from different origins


// Middleware
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB connection (change the connection string if you have a different database setup)
mongoose.connect("mongodb+srv://himanshichaturvedi2005:kLOUEPtQQCdSOrUK@cluster0.sqs5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Import the JobListing model
const JobListing = require('./joblisting.js');

// Post job listing route
app.post('/api/post-job', (req, res) => {
    const { company, title, description, salary, experience } = req.body;

    // Create a new job listing document using the model
    const newJobListing = new JobListing({
        company,
        title,
        description,
        salary,
        experience
    });

    // Save the job listing to MongoDB
    newJobListing.save()
        .then(() => res.status(200).send('Job posted successfully!'))
        .catch((err) => {
            console.error('Error posting job:', err);
            res.status(500).send('Error posting job.');
        });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
