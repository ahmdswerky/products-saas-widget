const express = require('express');
const { join } = require('path');

const app = express();

const dir = join(__dirname);

app.use(express.static(dir));

app.listen(5003, () => console.log(`Listening on http://localhost:5003`));
