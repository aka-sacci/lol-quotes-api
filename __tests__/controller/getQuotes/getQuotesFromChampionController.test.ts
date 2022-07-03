import { iMockData } from "../../../src/@types/myTypes"
//SUPERTEST
const request = require('supertest')
const testServer = require("../../../src/server")

//Import Mocks
const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

//Import database
const database = require('../../../src/database')

describe('getQuotesFromChampionController', () => {
    var connection: any

    const response = async (champion: string): Promise<any> => {
        const myRequest = await request(testServer)
            .get("/getquotes/champion/" + champion)
            .send()
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })

    it('should return status 200 and the quote when champion exist in database', async () =>{
        const myResponse = await response("Champion Test 0")
        expect(myResponse.status).toBe(200)
        expect(myResponse.body).toHaveProperty('quotes')
    })

    it('should return status 404 when champion doesn`t exist in database', async () => {
        const myResponse = await response("Champion Test 5")
        expect(myResponse.status).toBe(404)
    });

    it('should return status 500 when the server is turned down', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        const myResponse = await response("Champion Test 0")
        expect(myResponse.status).toBe(500)
    })

});