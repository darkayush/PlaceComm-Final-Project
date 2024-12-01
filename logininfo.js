const mongoose = require('mongoose');

// Define the schema for job listings
const LoginInfoSchema = new mongoose.Schema({
    type: { type: String, required:true},
    username: { type: String, required:true},
    password: { type: String, required: true }
});

// Create a model based on the schema
const LoginInfo = mongoose.model('LoginInfo', LoginInfoSchema);

module.exports = LoginInfo;
