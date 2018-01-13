const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');

// DB Config
const db = require('./config/database');

// Map global promise, remove the warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI, {
    useMongoClient: true,
})
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());

// Add Access Control headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Use our user routes into the application.
app.use('/users', userRoutes);

// Default route that sends back a message in JSON format if the other routes aren't called.
app.get('*', (req, res) => {
    res.send({ message: 'Welcome to the Holidayextras\' API!' });
});

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;