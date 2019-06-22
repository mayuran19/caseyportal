const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/api/users')
const members = require('./routes/api/members')

//Database URL
const db = require('./config/keys').mongoURL;
mongoose
.connect(db)
.then(() => console.log("Connected to mongodb"))
.catch(err => console.log(err))

app.get("/", (req, res) => res.send("Hello world"));

app.use('/api/users', users);
app.use('/api/members', members);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`))