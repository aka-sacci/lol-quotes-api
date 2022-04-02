import { iReturnObject } from '../../src/@types/myTypes';
//Import database
const database = require('../../src/database')

//Import service
const getQtdQuotesService = require('../../src/service/getAllQuotesService')
const service = new getQtdQuotesService

//Import Mocks
const mockQuotes = require('../../src/utils/mocks/mockQuotes')
const mockedData = new mockQuotes
describe('getAllQuotesService', () => {
    var connection: any
    var result: iReturnObject
    beforeAll(async () => {
        connection = await database
        await mockedData.insertMockedQuotes(connection)
    })

    it('should return all mocked quotes (1)', async () => {
        result = await service.execute()
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(true)
        expect(result).toHaveProperty("quoteData")
    });

    it("shouldn't return any quote", async () => {
        await mockedData.deleteMockedQuotes(connection)
        result = await service.execute()
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(false)
        expect(result).toHaveProperty("message")
        expect(result).not.toHaveProperty("quoteData")
    });

    it('should throw a connection error', async () => {
        await mockedData.deleteMockedQuotes(connection)
        await connection.connection.close()
        result = await service.execute()
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
    });
});

export { }