const express=require("express")
const app=express()
const cors=require("cors")
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true,origin: 'http://localhost:5173',}));
app.use(express.json(),express.urlencoded({extended:true}))


require('dotenv').config()
const port=process.env.port

require("./config/server.config")
require('./routes/user.routes')(app)
require('./routes/admin.routes')(app)
require('./routes/cour.routes')(app)
app.listen(port ,()=> console.log (`listen on port ${port}`))