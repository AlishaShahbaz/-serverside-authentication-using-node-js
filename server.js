const express  =require('express')
const app = express()
require('dotenv').config()
const auth = require('./route/auth')

const ConnectDB =  require('./config/db')
ConnectDB()
app.use(express.json())
app.use(auth)
const PORT = 4000

app.listen(PORT,()=>{
    console.log('server is running')
})