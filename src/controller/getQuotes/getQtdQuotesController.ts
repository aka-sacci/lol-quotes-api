import { Request, Response } from 'express'
import { iController, iReturnObject, iService } from '../../@types/myTypes'
const getQtdQuoteService = require('../../service/getQuotes/getQtdQuotesService')
const GetQtdQuoteService: iService = new getQtdQuoteService

class getQtdQuotesController implements iController {

    async handle(req: Request, res: Response): Promise<void> {
        var result: iReturnObject
        result = await GetQtdQuoteService.execute()
        if (result.success === true) {
            res.status(200).json({ qtd: result.qtd })
            
        } else {
            res.status(500).json({ error: result.error })
        }
    }
}

module.exports = getQtdQuotesController