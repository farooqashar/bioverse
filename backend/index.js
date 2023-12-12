const express = require("express");
const mongoose = require("mongoose");
const app = express();

var cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://ashar:ashar@cluster0.7op2yre.mongodb.net/support?retryWrites=true&w=majority"
);

console.log("Mongoose/MongoDB is connected");

const Ticket = mongoose.model("Ticket", {
  name: String,
  email: String,
  problem: String,
  status: String,
});

app.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find();
  res.json({ tickets });
});

app.post("/tickets", async (req, res) => {
  try {
    newValueIf = req.body.newValue;
    if (newValueIf) {
      const oldTicket = Ticket.find({_id: req.body._id});
      const update = { status: newValueIf };
      
      await oldTicket.updateOne(update);

      await newTicket.save();

    } else {
      const newTicket = new Ticket({
        name: req.body.name,
        email: req.body.email,
        problem: req.body.problem,
        status: req.body.status,
      });

      await newTicket.save();

      res.json(newTicket);
    }
  } catch {
    console.log("error");
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
