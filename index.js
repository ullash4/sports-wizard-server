// Fundamental setup
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

//Middlewar
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('sports wizard backend code runnig')
})
app.listen(port, ()=>{
    console.log('successfuly running code', port);
})