import { Request, Response } from 'express'
const getQuoteService = require('../service/getQuotesService')
const GetQuoteService = new getQuoteService


class getQuotesController {
    async getQuotes(req: Request<{ id: string }>, res: Response): Promise<void> {
        const result = await GetQuoteService.execute(req.params.id)
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