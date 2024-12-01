const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
    qualification: String,
    specialization: String,
    projects: String,
    workExperience: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
