const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.afkplob.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const bookingsCollection = client.db('e-commerce').collection('bookings')

        app.post('/bookings', async (req, res) => {
            const books = req.body;
            const result = await bookingsCollection.insertOne(books)
            res.send(result)
        })

        app.get('/allData', async (req, res) => {
            const product = await bookingsCollection.find({}).toArray()
            res.send(product)
        })

        app.delete('/allData', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await bookingsCollection.deleteOne(filter);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))

app.get('/', async (req, res) => {
    res.send('E-shop server is running')
})

app.listen(port, () => console.log(`E-shop running on ${port}`))