const express = require('express');
const router = express.Router();
const Profile = require('../model/profile.js');

// Route to save the profile data
router.post('/save', async (req, res) => {
    const { name, gender, email, phone, address, qualification, specialization, projects, workExperience } = req.body;

    try {
        const newProfile = new Profile({
            name,
            gender,
            email,
            phone,
            address,
            qualification,
            specialization,
            projects,
            workExperience
        });

        await newProfile.save();
        res.status(201).json({ message: 'Profile saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving profile' });
    }
});

module.exports = router;
