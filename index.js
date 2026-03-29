const express = require('express');
const app = express();

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('MEGA API WORKING 🚀');
});

// get clients
app.get('/clients', (req, res) => {
  res.json([
    { name: "Ahmed", phone: "0100000000", status: "active" }
  ]);
});

// add client
app.post('/clients', (req, res) => {
  const data = req.body;
  res.json({
    message: "Client added",
    data: data
  });
});

app.listen(3000, () => {
  console.log('Server running');
});
