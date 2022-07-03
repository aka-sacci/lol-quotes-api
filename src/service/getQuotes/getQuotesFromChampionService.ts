import { iExecuteParams, iReturnObject, iService } from "../../@types/myTypes";
const database = require('../../database')
const quotesModel = database.model('quotes')

class getQuotesFromChampionService implements iService {

    returnObject: iReturnObject;
    constructor(returnObject: iReturnObject) {
        this.returnObject = returnObject
    }

    async execute(params: { champion: string }) {
        const { champion } = params
        try {
            let allQuotesFromChampion = await this.getAllQuotesFromChampion(champion)

            //This Champion exists in database?
            if (Object.keys(allQuotesFromChampion).length === 0) {
                this.returnObject = {
                    success: true,
                    hasRows: false
                }
            } else {
                this.returnObject = {
                    success: true,
                    hasRows: true,
                    quoteData: allQuotesFromChampion
                }
            }

        } catch (err: any) {
            this.returnObject = {
                success: false,
                error: {
                    ...err

                }
            }
        }
        return this.returnObject
    }

    async getAllQuotesFromChampion(champion: string): Promise<Object> {
        const result = quotesModel.find({ champion })
            .then((data: any) => {
                return data
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

module.exports = getQuotesFromChampionService