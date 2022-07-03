import { iReturnObject, iMockData, iService } from '../../../src/@types/myTypes';

//Import database
const database = require('../../../src/database')

//Import service
const getQuotesFromChampion = require('../../../src/service/getQuotes/getQuotesFromChampionService')
const service: iService = new getQuotesFromChampion

//Import Mocks
const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes
describe('getQuotesFromChampionService', () => {
    
    var connection: any
    var result: iReturnObject
    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })

    it('should get all quotes from a champion, returning all these quotes, sucess = true and hasRows = true', async () => {
        result = await service.execute({ champion: "Champion Test 0"})
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(true)
        expect(result).toHaveProperty('quoteData')
    });

    it('shouldn´t return any quote, with success = true and hasRows = false ', async () => {
        result = await service.execute({ champion: "Champion Test 5"})
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(false)
    });

    it('shouldn´t fail when returning any quote, with success = false and a error', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        result = await service.execute({ champion: "Champion Test 0"})
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
    });
});