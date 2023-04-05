import express = require('express');
import bodyParser = require("body-parser");
//new
import cors = require("cors");
import cookieParser = require("cookie-parser");
import routes from './routes/routes'
//endnew


var app = express();
//new
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))
app.use(cookieParser())
app.use('/api', routes)
//endnew

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Hello world!");
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }