const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(() => {
    console.log(`App is listening on: ` + PORT);
});