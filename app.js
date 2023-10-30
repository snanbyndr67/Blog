const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { generateDate, limit, truncate, paginate} = require('./helpers/hbs');
const expressSession = require("express-session");
const mongoStore = require('connect-mongo'); // Connect-Mongo 1. adım
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/nodeblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(expressSession({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/nodeblog' }), // ConnectMongo 2.adım
}));

app.use(fileUpload());
app.use(express.static('public'));
app.use(methodOverride('_method'))

//Handlebars Helpers
const hbs = exphbs.create({
  helpers: {
    generateDate: generateDate,
    limit: limit,
    truncate: truncate,
    paginate: paginate
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true, // "prototype access" güvenlik önlemini devre dışı bırakır
  },

})


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Display Link Middleware
app.use(function (req, res, next) {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});


// Flash - Message Middleware
app.use(function (req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});


const main = require('./routes/main');
const posts = require('./routes/posts');
const users = require('./routes/users');
const admin = require('./routes/admin/index');

app.use('/', main);
app.use('/posts', posts);
app.use('/users', users);
app.use('/admin', admin);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
