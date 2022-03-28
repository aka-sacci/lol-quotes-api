import { Request, Response } from 'express'
const getQtdQuoteService = require('../service/getQtdQuotesService')
const GetQtdQuoteService = new getQtdQuoteService

class getQtdQuotesController {
    async getQtd(req: Request, res: Response): Promise<void> {
        const result = await GetQtdQuoteService.execute()
        if (result.success === true) {
            res.status(200).json({ qtd: result.qtd })
            
        } else {
            res.status(500).json({ error: result.error })
        }
    }
}

module.exports = getQtdQuotesController