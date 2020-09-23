require('./models/db');

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session')
// const session = require('express-session');

// const exphbs = require('express-handlebars')
const bodyparser = require('body-parser');

const userController = require('./controller/userController');

var app = express();
// app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))
app.use(bodyparser.urlencoded({
    extended: true  
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/', userController);

module.exports = { app }