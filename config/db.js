const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://himanshichaturvedi2005:kLOUEPtQQCdSOrUK@cluster0.sqs5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Your MongoDB URI
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("MongoDB connected!");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { client, connectToDatabase };
