import { Request, Response } from 'express'
import { iController, iReturnObject } from '../@types/myTypes'
const getAllQuotesService = require('../service/getAllQuotesService')
const GetAllQuotesService = new getAllQuotesService

class getAllQuotesController implements iController {

    async handle(req: Request, res: Response): Promise<void> {
        var result: iReturnObject
        result = await GetAllQuotesService.execute()
        if (result.success === true) {
            if (result.hasRows === true) {
                res.status(200).json({ quotes: result.quoteData })
            }
            else {
                res.status(404).json({ message: result.message })
            }
        } else {
            res.status(500).json({ error: result.error })
        }
    }
}

module.exports = getAllQuotesController