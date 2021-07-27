const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(function (req, res) {
    return res.sendStatus(200);
});

app.listen(8000, function () {
    console.log('Sample Hosting app listening on port 8000');
});
