import { Router, Request, Response, NextFunction } from "express";
const router = Router()

//CONTROLLERS
const getQuotesController = require('./controller/getQuotesController')
const GetQuotesController = new getQuotesController

const getQtdQuotesController = require('./controller/getQtdQuotesController')
const GetQtdQuotesController = new getQtdQuotesController

//TEST ROUTE
router.get('/test', (req: Request, res: Response) => {
    res.status(200).json({success: true})
})

//GET QUOTES ROUTE
router.get('/getquotes/:id', GetQuotesController.getQuotes)
//GET QUOTES QTD ROUTE
router.get('/getqtdquotes', GetQtdQuotesController.getQtd)


exports.router = router