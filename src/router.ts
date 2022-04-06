import { Router, Request, Response, NextFunction } from "express";
const router = Router()

//CONTROLLERS
const getQuotesController = require('./controller/getQuotes/getQuotesController')
const GetQuotesController = new getQuotesController

const getQtdQuotesController = require('./controller/getQuotes/getQtdQuotesController')
const GetQtdQuotesController = new getQtdQuotesController

const getAllQuotesController = require('./controller/getQuotes/getAllQuotesController')
const GetAllQuotesController = new getAllQuotesController

//TEST ROUTE
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({success: true})
})

//GET QUOTES ROUTE
router.get('/getquotes/:id', GetQuotesController.handle)
//GET QUOTES QTD ROUTE
router.get('/getqtdquotes', GetQtdQuotesController.handle)
//GET ALL QUOTES ROUTES
router.get('/getallquotes', GetAllQuotesController.handle)


exports.router = router