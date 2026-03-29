const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

// 🔗 حط رابط MongoDB هنا
const uri = "mongodb+srv://galaxymaneg_db_user:5tLXk3DR8VHrH2RL@mega.s42tt5h.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

// الاتصال بالداتابيز
async function connectDB() {
  try {
    await client.connect();
    db = client.db("mega");
    console.log("Connected to MongoDB 🚀");
  } catch (err) {
    console.error("DB Error:", err);
  }
}

connectDB();

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('MEGA API + DB WORKING 🚀');
});

// 📥 عرض كل العملاء
app.get('/clients', async (req, res) => {
  try {
    const clients = await db.collection("clients").find().toArray();
    res.json(clients);
  } catch (err) {
    res.status(500).send("Error fetching clients");
  }
});

// ⚡ إضافة عميل بسرعة (من المتصفح)
app.get('/add-client', async (req, res) => {
  try {
    await db.collection("clients").insertOne({
      name: "Ahmed",
      phone: "01000000000",
      status: "active"
    });
    res.send("Client added 🚀");
  } catch (err) {
    res.status(500).send("Error adding client");
  }
});

// 🧠 إضافة عميل (POST احترافي)
app.post('/add-client', async (req, res) => {
  try {
    const clientData = req.body;
    await db.collection("clients").insertOne(clientData);
    res.send("Client added 🚀");
  } catch (err) {
    res.status(500).send("Error adding client");
  }
});

// 🗑️ حذف عميل
app.delete('/delete-client/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection("clients").deleteOne({
      _id: new ObjectId(id)
    });

    res.send("Client deleted 🗑️");
  } catch (err) {
    res.status(500).send("Error deleting client");
  }
});

// ✏️ تعديل عميل
app.put('/update-client/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    await db.collection("clients").updateOne(
      { _id: new ObjectId(id) },
      { $set: newData }
    );

    res.send("Client updated ✏️");
  } catch (err) {
    res.status(500).send("Error updating client");
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
