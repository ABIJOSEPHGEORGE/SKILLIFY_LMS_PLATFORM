const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const cors = require('cors')
const logger = require('morgan')
const db = require('./config/database');

const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute');
const instructorRoute = require('./routes/instructorRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

db.connectDB();

app.use(cors(
    {
      origin: 'http://localhost:3000',
      credentials:true
    }
  ));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',"http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())


app.use('/',indexRoute);
app.use('/user',userRoute);
app.use('/instructor',instructorRoute);
app.use('/admin',adminRoute);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})