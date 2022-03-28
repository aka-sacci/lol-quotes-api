const GetQtdQuotesDatabase = require('../database')
const GetQtdQuotesModel = GetQtdQuotesDatabase.model('quotes')

class getQtdQuotesService {
    async execute(): Promise<Object> {
        try {
            const quoteData = await this.getQuoteById()
            return {
                success: true,
                qtd: quoteData
            }
        } catch (err: any) {
            return {
                success: false,
                error: {
                    ...err
                }
            }
        }
    }

    async getQuoteById(): Promise<object> {
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