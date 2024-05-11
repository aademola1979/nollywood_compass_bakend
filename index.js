const express = require('express');
const config = require('dotenv').config();
const cors = require('cors');
const user = require("./routes/userRoute.js");
const blog = require("./routes/blogRoute.js");
const mongoose = require('mongoose');



const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.use(express.json());


app.use('/', user);
app.use('/', blog)


mongoose.connect(process.env.MONGODB_URI).then(
    ()=>{
        app.listen(PORT, ()=>{
            console.log("App listening on port:", PORT)
        })
    }

).catch((error)=>{
    console.log(error)
})




