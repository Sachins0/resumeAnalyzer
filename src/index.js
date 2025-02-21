const express = require('express');
const {connectDB} = require('./config');
const apiRoutes = require('./routes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {

    app.on("errror", (error) => {
        console.log("Error in Server running: ", error);
        throw error
    })

    app.listen(PORT, () => {
        console.log(`⚙ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
