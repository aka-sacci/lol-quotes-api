import { iCreateQuote, iExecuteParams, iReturnObject, iService } from "../../@types/myTypes"

const insertQuoteModel = require('../../database')
const InsertQuoteModel = insertQuoteModel.model('quotes')

class insertQuote implements iService {

    returnObject: iReturnObject;
    constructor(returnObject: iReturnObject) {
        this.returnObject = returnObject
    }

    async execute(params: { createQuote: iCreateQuote }): Promise<object> {
        const { quote } = params.createQuote

        try {
            const getQuoteReturn = await this.getQuote(quote)

            if (getQuoteReturn != null) {
                this.returnObject = {
                    success: false,
                    error: {
                        message: "Essa fala já foi cadastrada!",
                        name: "ERR_QUOTE_ALREADY_EXISTS"
                    }
                }
            } else {
                const insertionResult = await this.insertQuote(params.createQuote)
                if (insertionResult.success == true) {
                    this.returnObject = {
                        success: true
                    }
                }
            }
        } catch (err: any) {
            this.returnObject = {
                success: false,
                error: {
                    name: String(err.name),
                    message: String(err.message)
                }
            }
        }
        return this.returnObject
    }

    async getQuote(quote: string): Promise<object> {
        const result = await InsertQuoteModel
            .findOne({ quote: quote })
            .then((result: object) => result)
            .catch((err: Error) => {
                const errorToBeThrown = new Error
                errorToBeThrown.message = err.message
                errorToBeThrown.name = err.name
                throw errorToBeThrown
            })
        return result
    }

    async insertQuote(params: iCreateQuote) {
        const { quote, length, champion } = params
        const result = await new InsertQuoteModel({
            quote,
            length,
            champion
        })
            .save()
            .then(() => {
                return { success: true }
            })
            .catch((err: Error) => {
                const errorToBeThrown = new Error
                errorToBeThrown.message = err.message
                errorToBeThrown.name = err.name
                throw errorToBeThrown
            })
        return result
    }
}

module.exports = insertQuote