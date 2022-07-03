import { Request, Response, NextFunction } from "express";
import { iController, iReturnObject, iService } from "../../@types/myTypes";
const getQuotesFromChampionService = require('../../service/getQuotes/getQuotesFromChampionService')
const GetQuotesFromChampionService: iService = new getQuotesFromChampionService


class getQuotesFromChampionController implements iController {
    async handle(req: Request<{ champion: string }>, res: Response): Promise<void> {
        const { champion } = req.params
        GetQuotesFromChampionService.execute({ champion })
            .then((data: iReturnObject) => {
                if (data.success === false) {
                    const errorToBeThrown = new Error()
                    errorToBeThrown.name = String(data.error?.name)
                    errorToBeThrown.message = String(data.error?.message)
                    throw errorToBeThrown
                }
                
                switch (data.hasRows) {
                    case true: res.status(200).json({ quotes: data.quoteData })
                    case false: res.status(404).send()
                }
            }).catch((err: Error) => {
                res.status(500).json({ ...err })
            })
    }
}

module.exports = getQuotesFromChampionController