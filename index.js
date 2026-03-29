const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// 🔗 حط هنا الرابط بتاعك
const uri = "PUT_YOUR_MONGODB_URL_HERE";

const client = new MongoClient(uri);

let db;

// connect to database
async function connectDB() {
  await client.connect();
  db = client.db("mega");
  console.log("Connected to MongoDB 🚀");
}

connectDB();

// test
app.get('/', (req, res) => {
  res.send('MEGA API + DB WORKING 🚀');
});

// get clients
app.get('/clients', async (req, res) => {
  const clients = await db.collection("clients").find().toArray();
  res.json(clients);
});

// add client
app.post('/clients', async (req, res) => {
  const data = req.body;
  await db.collection("clients").insertOne(data);
  res.json({ message: "Client saved ✅" });
});

app.listen(3000, () => {
  console.log('Server running');
});
