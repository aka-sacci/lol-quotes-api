import { Request, Response } from 'express'
import { iController, iReturnObject, iService } from '../../@types/myTypes'
const getQuoteService = require('../../service/getQuotes/getQuotesService')
const GetQuoteService: iService = new getQuoteService

class getQuotesController implements iController {

    async handle(req: Request<{ id: string }>, res: Response): Promise<void> {
        var result: iReturnObject
        result = await GetQuoteService.execute({id: req.params.id})
        if (result.success === true) {
            if (result.hasRows === true) {
                res.status(200).json({ quote: result.quoteData })
            }
            else {
                res.status(404).json({ message: result.message })
            }
        } else {
                res.status(500).json({ error: result.error })
        }
        
    }
}

module.exports = getQuotesController