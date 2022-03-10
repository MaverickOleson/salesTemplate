const express = require('express');
const app = express();
const test = require('./routes/index');

app.set('view engine', 'ejs');
app.set()

app.listen(5000, () => {
	console.log('Server is listening on port 5000')
});