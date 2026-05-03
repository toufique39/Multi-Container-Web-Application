
const crypto = require('crypto');
global.crypto = crypto;

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongo:27017/testdb');

const Data = mongoose.model('Data', { name: String });

app.use(express.urlencoded({ extended: true }));

// Home Page
app.get('/', async (req, res) => {
  const allData = await Data.find();

  let list = "";
  allData.forEach(d => {
    list += `<li>${d.name}</li>`;
  });

  res.send(`
    <html>
      <head>
        <title>My Docker App</title>
      </head>
      <body>
        <h1>🚀 My Docker Web App</h1>

        <form action="/add" method="POST">
          <input type="text" name="name" placeholder="Enter name" required/>
          <button type="submit">Add Data</button>
        </form>

        <h2>📊 Stored Data:</h2>
        <ul>
          ${list}
        </ul>
      </body>
    </html>
  `);
});

// Add Data
app.post('/add', async (req, res) => {
  await Data.create({ name: req.body.name });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
