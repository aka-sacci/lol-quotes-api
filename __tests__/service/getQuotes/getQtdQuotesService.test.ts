import { iReturnObject, iMockData, iService } from '../../../src/@types/myTypes';
//Import database
const database = require('../../../src/database')

//Import service
const getQtdQuotesService = require('../../../src/service/getQuotes/getQtdQuotesService')
const service: iService = new getQtdQuotesService

//Import Mocks
const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

describe('getQtdQuotesService', () => {
    var connection: any
    var result: iReturnObject
    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })

    it('should return the number of quotes (1)', async () => {
        result = await service.execute()
        expect(result.success).toBe(true)
        expect(result).toHaveProperty("qtd")
    });

    it('should throw a connection error', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        result = await service.execute()
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
    });

});

export { }