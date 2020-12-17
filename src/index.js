const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require('./data')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

const getProperVal = (value, defaultValue) =>
    (value === null || value === undefined || isNaN(value)) ? defaultValue : Number(value);

app.get('/topRankings', async (req, res) => {
    const offset = getProperVal(req.query.offset, 0);
    const limit = getProperVal(req.query.limit, 20) + offset;
    console.log(`limit:${limit} offset:${offset}`);

    const response = await data.slice(offset, limit);

    res.send(response);

});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
