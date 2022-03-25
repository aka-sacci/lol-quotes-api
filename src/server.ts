//Dependencies
import express, { Request, Response } from 'express'
const cors = require('cors')

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
    //TEST ROUTE
    app.get('/test', (req: Request, res: Response) => {
        res.status(200).json({success: true})
    })

module.exports = app