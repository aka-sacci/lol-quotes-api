import { iService, iReturnObject } from "../../@types/myTypes";
const getQuotesDatabase = require('../../database')
const GetQuotesModel = getQuotesDatabase.model('quotes')

class getQuotesService implements iService {

    quoteData: object
    returnObject: iReturnObject;
    constructor(quoteData: object, returnObject: iReturnObject) {
        this.quoteData = quoteData;
        this.returnObject = returnObject
    }

    async execute(params: { id: number }): Promise<object> {
        const { id } = params
        try {
            this.quoteData = await this.getQuoteById(id)
            if (this.quoteData === null) this.returnObject = {
                success: true,
                hasRows: false,
                message: "Não há nenhuma fala com o index " + id
            }
            else this.returnObject = {
                success: true,
                hasRows: true,
                quoteData: this.quoteData
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

    async getQuoteById(id: number): Promise<object> {
        const result = await GetQuotesModel
            .findOne({ index: id })
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

module.exports = getQuotesService