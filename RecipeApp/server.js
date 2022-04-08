require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const connectDB = require("./config/connectDB");
const auth = require("./routes/auth");
const user = require("./routes/user")
const product = require("./routes/product")
const comment = require("./routes/comment")
const admin = require("./routes/admin")


// Associate express methods to the variabel app
const app = express();

//Parse data
app.use(express.json());

// Data base Connection
connectDB();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
//Create endpoints
app.use("/auth", auth);
app.use("/product", product);
app.use("/user", user);
app.use("/comment", comment);
app.use("/root", admin);

// Listen to port and run server
app.listen(process.env.PORT || process.env.port, (err) => {
  err
    ? console.log(`Server connection failed`)
    : console.log(`Server connected successfully on port ${process.env.PORT}`);
});
