const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://user2:6yUcADMncES1pcc7@cluster0.sqs5n.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const seedUsers = async () => {
    const users = [
        { email: "ayush.sharma.23cse@bmu.edu.in", password: "studentpassword", userType: "student" },
        { email: "ananya.pandey.23cse@bmu.edu.in", password: "studentpassword", userType: "student" },
        { email: "himanshi.chaturvedi.23cse@bmu.edu.in", password: "studentpassword", userType: "student" },
        { email: "company@gmail.com", password: "company", userType: "company" }
    ];

    try {
        await User.insertMany(users);
        console.log('Users added successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding users:', err);
        mongoose.connection.close();
    }
};

seedUsers();
