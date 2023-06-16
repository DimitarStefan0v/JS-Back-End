const express = require('express');

const expressConfig = require('./config/expressConfig');

const app = express();

const PORT = 5000;

expressConfig(app);

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));