//Import database
const database = require('../../src/database')

//Import service
const getQuoteService = require('../../src/service/getQuotesService')
const service = new getQuoteService

//Import Mocks
const mockQuotes = require('../../src/utils/mocks/mockQuotes')
const mockedData = new mockQuotes

describe('getQuotesService', () => {
    var connection: any
    beforeAll(async () => {
        connection = await database
        await mockedData.insertMockedQuotes(connection)
    })

    it('should return the quote with index 0', async () => {
        const result = await service.execute(0)
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(true)
        expect(result).toHaveProperty("quoteData")

    });

    it("shouldn't return any quote", async () => {
        const result = await service.execute(50)
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(false)
        expect(result).toHaveProperty("message")
        expect(result).not.toHaveProperty("quoteData")
    });

    it('should throw a connection error ', async () => {
        await mockedData.deleteMockedQuotes(connection)
        await connection.connection.close()
        const result = await service.execute(50)
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
    });

});

export { }