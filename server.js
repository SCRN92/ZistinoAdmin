const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./Models/userModel");
const path = require('path');
const passport = require('passport');
const http = require("http");

dotenv.config({ path: "./config.env" });

/* ---------for Local database connection---------- */
const DB = process.env.DATABASE_LOCAL;

/* --------for Atlas database connection---------- */
// const DB = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
// );

// Connect to the database
mongoose
    .connect(DB, {
        useNewUrlParser: true,   // To use the new URL parser
        useUnifiedTopology: true,   // To use the new Server Discover and Monitoring engine
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.error("DB connection error:", err));

// Create HTTP server
const server = http.createServer(app);
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

/* --------- Seeder ------------ */
const migration = async () => {
    try {
        const user = await User.find({ email: 'admin@zistino.ir' });
        if (user.length === 0) {
            await User.create({ email: 'admin@zistino.ir', name: 'admin', location: 'Iran', password: process.env.ADMIN_PASSWORD });
            console.log('Admin user created');
        }
    } catch (err) {
        console.error('Error during migration:', err);
    }
};
migration();

// Route to update profile picture
app.post('/profileUpdate', async (req, res) => {
    if (req.files) {
        const targetFile = req.files.file;
        try {
            await User.findByIdAndUpdate(req.body.user_id, { image: targetFile.name });
            const uploadDir = path.join(__dirname, '/public/assets/images/profile_pictures', targetFile.name);
            targetFile.mv(uploadDir, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send('File uploaded!');
            });
        } catch (err) {
            res.status(500).send('Error updating profile picture');
        }
    } else {
        res.status(400).send('No file uploaded');
    }
});

// Route to change user name
app.post('/changename', async (req, res) => {
    if (req.body.user_id) {
        try {
            await User.findByIdAndUpdate(req.body.user_id, { name: req.body.name });
            res.send('Name updated!');
        } catch (err) {
            res.status(500).send('Error updating name');
        }
    } else {
        res.status(400).send('User ID not provided');
    }
});