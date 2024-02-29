const express= require('express')
const env=require('dotenv')
const mongoose=require('mongoose')
const userRouter=require('./routes/userRouter')
const adminRouter=require('./routes/adminRouter')
const cors = require('cors');
const cookieParser = require('cookie-parser');

env.config();


const port=process.env.port

const app=express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/admin", adminRouter);



mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => { console.log(`Server running on http://localhost:${port}`) })
    })
    .catch((err) => console.error('Error connecting to the database:', err));