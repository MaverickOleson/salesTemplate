const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.set('layout', 'layout/main.ejs');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/styles'));
app.use(expressLayouts);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);
app.use('/js', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/styles'));

app.get('/', (req, res) => {
	res.render('pages/login', {
	});
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(5000, console.log(`server is listening on port 5000`));
	} catch (error) { console.error(error) }
}
start();