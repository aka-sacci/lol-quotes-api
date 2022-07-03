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

const isAuthedController = require('./controller/user/isAuthedController')
const IsAuthedController: iController = new isAuthedController

const logoutController = require('./controller/user/logoutController')
const LogoutController: iController = new logoutController

const insertQuoteController = require('./controller/insertQuotes/insertQuoteController')
const InsertQuoteController: iController = new insertQuoteController()

const getQuotesFromChampionController = require('./controller/getQuotes/getQuotesFromChampionController')
const GetQuotesFromChampionController: iController = new getQuotesFromChampionController()

//TEST ROUTE
router.get('/test', (req: Request, res: Response) => {
    // const test = req.cookies['JWT'] -> Assim que pega o Token
    // console.log(test)
    res.status(200).json({header: "cu"})
})

//GET QUOTES ROUTE
router.get('/getquotes/:quote', GetQuotesController.handle)
//GET QUOTES QTD ROUTE
router.get('/getqtdquotes', GetQtdQuotesController.handle)
//GET ALL QUOTES ROUTES
router.get('/getallquotes', GetAllQuotesController.handle)
//AUTH USER ROUTE
router.post('/authuser', UserLoginController.handle)
//CREATE USER ROUTE
router.post('/createuser', CreateUserController.handle)
//AUTH JWT CHECKER ROUTE
router.get('/isauthed', IsAuthedController.handle)
//LOGOUT ROUTE
router.get('/logout', LogoutController.handle)
//INSERT QUOTE ROUTE
router.post('/insertquote', InsertQuoteController.handle)
//GET QUOTES FROM A CHAMPION ROUTE
router.get('/getquotes/champion/:champion', GetQuotesFromChampionController.handle)
exports.router = router