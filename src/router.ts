import { Router, Request, Response, NextFunction } from "express";
import { iController } from "./@types/myTypes";

const router = Router()

//CONTROLLERS
const getQuotesController = require('./controller/getQuotes/getQuotesController')
const GetQuotesController: iController = new getQuotesController

const getQtdQuotesController = require('./controller/getQuotes/getQtdQuotesController')
const GetQtdQuotesController: iController = new getQtdQuotesController

const getAllQuotesController = require('./controller/getQuotes/getAllQuotesController')
const GetAllQuotesController: iController = new getAllQuotesController

const userLoginController = require('./controller/user/userLoginController')
const UserLoginController: iController = new userLoginController


const createUserController = require('./controller/user/createUserController')
const CreateUserController: iController = new createUserController

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
//AUTH USER ROUTE
router.post('/authuser', UserLoginController.handle)
//CREATE USER ROUTE
router.post('/createuser', CreateUserController.handle)


exports.router = router