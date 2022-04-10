const mongoose = require('mongoose')
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

//Shemas
const quotesSchema = require('./models/quotesSchema')
const usersSchema = require('./models/usersSchema')

//Config Mongoose

try {
    const database = returnDatabaseURL()
    mongoose.connect(database)
    modelDefinition(mongoose)
} catch (err: any) {
    console.log("Erro ao se conectar ao MongoDB: " + err)
}


function modelDefinition(connection: any): void {
    connection.model("quotes", quotesSchema)
    connection.model("users", usersSchema)
}

function returnDatabaseURL(): string | undefined {
    if (env === "development") return process.env.DATABASE_URL
    if (env === "test") return process.env.TEST_DATABASE_URL
}

module.exports = mongoose