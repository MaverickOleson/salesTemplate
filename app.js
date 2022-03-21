const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/index.html'));
})

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(5000, console.log(`server is listening on port 5000`));
	} catch (error) { console.error(error) }
}
start();