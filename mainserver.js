const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db'); // Import the MongoDB connection

// Import routes
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api', jobRoutes);  // Job-related routes
app.use('/api', companyRoutes);  // Company-related routes


// Start the server after connecting to the database
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
});
