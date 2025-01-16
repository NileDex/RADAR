const express = require('express');
const app = express();
const events = [];

app.use(express.json());

app.get('/events', (req, res) => res.json(events));
app.post('/events', (req, res) => {
  events.push(req.body);
  res.status(201).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
