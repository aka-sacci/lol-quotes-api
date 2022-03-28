//Dependencies
import express, { Request, Response } from 'express'
const cors = require('cors')
const { router } = require("./router")
const database = require('./database')

//App
const app = express()

//Config
    //CORS
    app.use(cors())

//Middlewares
    //JSON CONVERTER
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

//Routes
    app.use(router)

module.exports = app