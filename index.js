// Fundamental setup
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

//ullash
//H6x-CgEb9Hwq.9G

//Middlewar
app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ullash:H6x-CgEb9Hwq.9G@cluster0.1hpxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('mongodb connected');
  // perform actions on the collection object
  client.close();
});







app.get('/', (req, res)=>{
    res.send('sports wizard backend code runnig')
})
app.listen(port, ()=>{
    console.log('successfuly running code', port);
})