const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const following = require('./instagram/following');
const app = express();
const PORT = 8888;

app.use(bodyParser.json());
app.use(cors());


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await following.start();
  setInterval(async function () {
    console.log('start interval');
    await following.start();
  }, 60 * 60 * 1000);
});
