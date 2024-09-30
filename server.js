const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./Models/userModel");
const path = require('path');
const passport = require('passport');
dotenv.config({ path: "./config.env" });

/* ---------for Local database connection---------- */
const DB = process.env.DATABASE_LOCAL;

/* --------for Atlas database connection---------- */
// const DB = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
// );

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then((con) => console.log("DB connection Succeful!"));

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

/* --------- seeder ------------ */
const migration = async () => {
    const user = await User.find({ email: 'admin@zistino.ir' });
    if (user.length == 0) {
        await User.create({ email: 'admin@zistino.ir', name: 'admin', location: 'Iran', password: '12345678' });
    }
}
migration();

app.post('/profileUpdate', async (req, res) => {
    if (req.files) {
        const targetFile = req.files.file;
        const im = await User.findByIdAndUpdate(req.body.user_id, { image: targetFile.name });
        let uploadDir = path.join(__dirname, '/public/assets/images/profile_pictures', targetFile.name);
        targetFile.mv(uploadDir, (err) => {
            if (err)
                return res.status(500).send(err);
            res.send('File uploaded!');
        });
    }
});
app.post('/changename', async (req, res) => {
    if (req.body.user_id) {

        await User.findByIdAndUpdate(req.body.user_id, { name: req.body.name });
        res.send('name updated!');
    }
});