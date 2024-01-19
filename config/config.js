const mongoose = require('mongoose');

require('dotenv').config()
const db = process.env.db

mongoose.connect(db)
.then(() =>{
    console.log('Database connection established')
})
.catch((err) =>{
    console.log(`message connecting to database: ${err.message}`);
});