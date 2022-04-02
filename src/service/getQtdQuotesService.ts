import { iService, iReturnObject } from "../@types/myTypes";
const GetQtdQuotesDatabase = require('../database')
const GetQtdQuotesModel = GetQtdQuotesDatabase.model('quotes')

class getQtdQuotesService implements iService {

    quoteData: object
    returnObject: iReturnObject;
    constructor(quoteData: object, returnObject: iReturnObject) {
        this.quoteData = quoteData;
        this.returnObject = returnObject
    }

    async execute(): Promise<iReturnObject>{
        try {
            this.quoteData = await this.getQuoteQtd()
            this.returnObject = {
                success: true,
                qtd: this.quoteData
            }
            return this.returnObject
        } catch (err: any) {
            return {
                success: false,
                error: {
                    ...err
                }
            }
        }
    }

    async getQuoteQtd(): Promise<object> {
        const result = await GetQtdQuotesModel
            .count({})
            .then((result: object) => result)
            .catch((err: Error) => {
                const errorToBeThrown = new Error
                errorToBeThrown.message = err.message
                errorToBeThrown.name = err.name
                throw errorToBeThrown
            })
        return result
    }
}

module.exports = getQtdQuotesService