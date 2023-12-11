const express = require('express');
const mongoose = require('mongoose');
const app = express();

var cors = require('cors')

app.use(cors()) 

const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

mongoose.connect('mongodb+srv://ashar:ashar@cluster0.7op2yre.mongodb.net/support?retryWrites=true&w=majority');

console.log("Mongoose/MongoDB is connected");

const Ticket = mongoose.model('Ticket', {
  name: String,
  email: String,
  problem: String, 
  status: String
});

app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json({tickets});
});

app.post('/tickets', async (req, res) => {
    
  const newTicket = new Ticket({
    name: req.body.name,
    email: req.body.email,
    problem: req.body.problem,
    status: req.body.problem
  });

  await newTicket.save();

  res.json(newTicket);
});

app.listen(3002, () => {
  console.log('Server is listening on port 3002');
});
