const express  =require('express')
require('dotenv').config()
const ConnectDB =  require('./config/db')

const app = express()

ConnectDB()

app.listen(6000,()=>{
    console.log('server is running')
})