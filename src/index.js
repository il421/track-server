// need to be executed one time
require("./models/Users");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRoutes);

const mangoUri =
  "mongodb+srv://admin:il421sug@cluster0.1pjuq.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mangoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", err => {
  console.error("Error connecting to MongoDB", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => {
  console.log("Listener on port 3001");
});
