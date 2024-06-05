const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

const { route_login } = require("./routes/route_login");
const { tokenverification } = require("./middlewares/tokenverification");
const { route_post } = require("./routes/route_post");
const { route_favorites } = require("./routes/route_favorites");
const connectDB  = require("./config/db");



connectDB();
app.use(express.json({ limit: '50mb' }));
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })); //true

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use('/',route_login)
app.use(tokenverification)
app.use('/post',route_post)

app.use('/favorites',route_favorites)

app.listen(process.env.port, () => {
  console.log(`Server is Running on ${process.env.baseUrl} at ${process.env.port}`);
});
