const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const route = require('./routes');
const cors = require("cors")
const db = require("./config");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');  

require('dotenv').config();

app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);

db.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})  