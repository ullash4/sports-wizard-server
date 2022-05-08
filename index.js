// Fundamental setup
const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


//Middlewar
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1hpxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        // basic formations
        await client.connect();
        const productCollection = client.db("sportsWizard").collection("product")

        // get all data
        app.get("/product", async(req, res)=>{
            const query = {}
            const cursor = productCollection.find(query)
            const product = await cursor.toArray();
            res.send(product)
        })

        // get my item
        app.get("/product", async(req, res)=>{
            const email = req.query.email;
            const query = {email}
            const cursor = productCollection.find(query)
            const product = await cursor.toArray();
            res.send(product)
        })

        // get single product
        app.get("/product/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const item = await productCollection.findOne(query);
            res.send(item)
        })

        // Add new item
        app.post("/product", async(req, res)=>{
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct)
            res.send(result);
        })

        // Delete item
        app.delete("/product/:id", async(req, res)=>{
            const id  = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await productCollection.deleteOne(query)
            res.send(result);
        })

        //Deliverd 1 item
        app.put("/product/:id", async(req, res)=>{
            const id = req.params.id;
            const deliveredQty = req.body;
            const filter = {_id: ObjectId(id)}
            const options = { upsert: true };
            const updatedDoc={
                $set: {
                    quantity: deliveredQty.result
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })
        
        //Update or restock quantity
        app.put("/product/:id", async(req, res)=>{
            const id = req.params.id;
            const updatedQty = req.body;
            const filter = {_id: ObjectId(id)}
            const options = { upsert: true };
            const updatedDoc={
                $set: {
                    quantity: updatedQty.result
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);







app.get('/', (req, res)=>{
    res.send('sports wizard backend code runnig')
})
app.listen(port, ()=>{
    console.log('successfuly running code', port);
})