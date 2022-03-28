const getQuotesDatabase = require('../database')
const GetQuotesModel = getQuotesDatabase.model('quotes')

class getQuotesService {
    async execute(id: number): Promise<Object> {
        try {
            const quoteData = await this.getQuoteById(id)
            var returnObject = {}
            if (quoteData === null) returnObject = {
                success: true,
                hasRows: false,
                message: "Não há nenhuma fala com o index " + id
            }
            else returnObject = {
                success: true,
                hasRows: true,
                quoteData
            }
            return returnObject
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