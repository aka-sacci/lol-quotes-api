//Import database
const database = require('../../src/database')

//Import service
const getQtdQuotesService = require('../../src/service/getQtdQuotesService')
const service = new getQtdQuotesService

//Import Mocks
const mockQuotes = require('../../src/utils/mocks/mockQuotes')
const mockedData = new mockQuotes

describe('getQtdQuotesService', () => {
    var connection: any
    beforeAll(async () => {
        connection = await database
        await mockedData.insertMockedQuotes(connection)
    })

    it('should return the number of quotes (1)', async () => {
        const result = await service.execute()
        expect(result.success).toBe(true)
        expect(result).toHaveProperty("qtd")
        expect(result.qtd).toBe(1)
    });

    it('should throw a connection error', async () => {
        await mockedData.deleteMockedQuotes(connection)
        await connection.connection.close()
        const result = await service.execute()
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
    });

});

export { }