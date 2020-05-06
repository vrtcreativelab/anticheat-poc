const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const checkKey = require("./checkKey");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  console.log(req.body);
  const response = await checkKey(req.body.score, req.body.key);
  res.send(response);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
