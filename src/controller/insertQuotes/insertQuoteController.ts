import { Request, Response } from "express";
import { json } from "stream/consumers";
import { iController, iCreateQuote, iReturnObject, iService } from "../../@types/myTypes";
const insertQuoteService = require('../../service/insertQuotes/insertQuoteService')
const InsertQuoteService: iService = new insertQuoteService

class insertQuoteController implements iController {
    async handle(req: Request<{}, {}, iCreateQuote>, res: Response): Promise<void> {
        var result: iReturnObject
        try {
            const { quote, champion, length } = req.body

            //Is any field missing?
            if (quote == null || champion == null || length == null) {
                const missingFieldErrorToBeThrown = new Error
                missingFieldErrorToBeThrown.message = "Some field(s) is missing!"
                missingFieldErrorToBeThrown.name = "ERROR_MISSING_FIELD"
                throw missingFieldErrorToBeThrown
            }

            //Is any field blank?
            if (quote == "" || champion == "" || length == 0) {
                const blankFieldErrorToBeThrown = new Error
                blankFieldErrorToBeThrown.message = "Some field(s) is blank!"
                blankFieldErrorToBeThrown.name = "ERROR_BLANK_FIELD"
                throw blankFieldErrorToBeThrown
            }

            result = await InsertQuoteService.execute({ createQuote: req.body })

            switch (result.success) {
                case true:
                    res.status(201).send()
                    break;
                case false:
                    const caseFalseErrorToBeThrown = new Error
                    caseFalseErrorToBeThrown.message = String(result.error?.message)
                    caseFalseErrorToBeThrown.name = String(result.error?.name)
                    throw caseFalseErrorToBeThrown
                default:
                    const defaultErrorToBeThrown = new Error
                    defaultErrorToBeThrown.message = "Unknow error!"
                    defaultErrorToBeThrown.name = "ERR_UNKNOW"
                    throw defaultErrorToBeThrown
            }
        } catch (err: any) {
            switch (err.name) {
                case "ERR_QUOTE_ALREADY_EXISTS":
                    res.status(409).json({
                        error: {
                            message: err.message,
                            name: err.name
                        }
                    })
                    break;
                case "ERROR_MISSING_FIELD":
                    res.status(400).json({
                        error: {
                            message: err.message,
                            name: err.name
                        }
                    })
                    break;
                case "ERROR_BLANK_FIELD":
                    res.status(400).json({
                        error: {
                            message: err.message,
                            name: err.name
                        }
                    })
                    break;
                default:
                    res.status(500).json({
                        error: {
                            message: err.message,
                            name: err.name
                        }
                    })
                    break;
            }
        }


    }
}

module.exports = insertQuoteController