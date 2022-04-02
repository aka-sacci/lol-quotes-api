import { iService, iReturnObject } from "../@types/myTypes";
const getAllQuotesDatabase = require('../database')
const GetAllQuotesModel = getAllQuotesDatabase.model('quotes')

class getAllQuotesService implements iService {

    quoteData: object
    returnObject: iReturnObject;
    constructor(quoteData: object, returnObject: iReturnObject) {
        this.quoteData = quoteData;
        this.returnObject = returnObject
    }
    async execute(): Promise<object> {
        try {
            this.quoteData = await this.getAllQuotes()

            if (Object.keys(this.quoteData).length === 0) this.returnObject = {
                success: true,
                hasRows: false,
                message: "Não há nenhuma fala!",
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

    async getAllQuotes(): Promise<object> {
        const result = await GetAllQuotesModel
            .find()
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

module.exports = getAllQuotesService