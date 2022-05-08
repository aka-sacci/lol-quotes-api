import { iReturnObject, iService, iMockData } from "../../../src/@types/myTypes"

const database = require('../../../src/database')

//Import service
const insertQuoteService = require('../../../src/service/insertQuotes/insertQuoteService')
const service: iService = new insertQuoteService

const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

describe('insertQuote', () => {
    var connection: any
    var result: iReturnObject
    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })

    it('should sucessfully insert a new quote', async () => {
        result = await service.execute({
            createQuote: {
                quote: "Quote Test 1",
                length: 1000,
                champion: "Champion Test 1"
            }
        })
        expect(result.success).toBe(true)
    });

    it('should fail when trying to insert the same quote', async () => {
        result = await service.execute({
            createQuote: {
                champion: "Champion Test 0",
                quote: "Quote Test 0",
                length: 1000,
            }
        })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
        expect(result.error?.name).toBe('ERR_QUOTE_ALREADY_EXISTS')
    });

    it('should fail when trying to insert a quote', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        result = await service.execute({
            createQuote: {
                quote: "Test quote 0",
                length: 1000,
                champion: "Test champion 0"
            }
        })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
    });

})