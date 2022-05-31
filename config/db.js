const mongoose = require('mongoose')
require('dotenv').config()


const ConnectDB = async () => {
    try
    {
        const conn = await mongoose.connect('mongodb+srv://serversideauth:serversideauth@cluster0.fivsk.mongodb.net/?retryWrites=true&w=majority')
        console.log(`Mongodb  connect `)
    }
    catch (error)
    {
        console.log(`Mongodb Not connect `)

    }

}

module.exports = ConnectDB