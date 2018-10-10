const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const following = require('./instagram/following');
const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

app.use('/', (res, req, next)=> {
    res.send('Hello pidor');
    next();
});
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await following.start();
  setInterval(async function () {
    console.log('start interval');
    await following.start();
  }, 60 * 60 * 1000);

    let reqTimer = setTimeout(function wakeUp() {
        request("https://insta-booster2k18.herokuapp.com", function() {
            console.log("WAKE UP SUKO");
        });
        return reqTimer = setTimeout(wakeUp, 1200000);
    }, 1200000);
});
