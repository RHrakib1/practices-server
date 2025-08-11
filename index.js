const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5001;
const app = express()

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://rakibrh1232:YKk0HVkEDstk1pvl@cluster0.vlbcfwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db("datapracticebase");
        const data = database.collection("basebata");
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        app.get('/pruser', async (req, res) => {
            const courser = data.find()
            const result = await courser.toArray()
            res.send(result)
        })

        app.get('/pruser/:id', async (req, res) => {
            const iddata = req.params.id
            const coureser = { _id: new ObjectId(iddata) }
            const result = await data.findOne(coureser)
            res.send(result)
        })

        app.post('/pruser', async (req, res) => {
            const user = req.body
            console.log(user)
            const result = await data.insertOne(user);
            res.send(result)
        })
        app.put('/pruser/:id', async (req, res) => {
            const id = req.params.id
            const user = req.body
            console.log(id, user)
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const userdata = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await data.updateOne(filter, userdata, options)
            res.send(result)

        })
        app.delete('/pruser/:id', async (req, res) => {
            const useriddeltet = req.params.id
            const courser = { _id: new ObjectId(useriddeltet) }
            const result = await data.deleteOne(courser)
            res.send(result)
            console.log('delete form database', useriddeltet)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('simple database oparation done')
})
app.listen(port, () => {
    console.log(`databas theke data connect hoise:${port}`)
})