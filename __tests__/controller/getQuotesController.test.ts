import { iMockData } from "../../src/@types/myTypes"
//SUPERTEST
const request = require('supertest')
const testServer = require("../../src/server")

//Import Mocks
const mockQuotes = require('../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

//Import database
const database = require('../../src/database')
describe('getQuotesController', () => {
    var connection: any

    const response = async (id: number): Promise<any> => {
        const myRequest = await request(testServer)
        .get("/getquotes/" + id)
        .send()
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })
    it('should return status 200 and a quote', async () => {
        const myResponse = await response(0)
        expect(myResponse.status).toBe(200)
        expect(myResponse.body).toHaveProperty("quote")
    });

    it('should return status 404 and a message', async () => {
        const myResponse = await response(50)
        expect(myResponse.status).toBe(404)
        expect(myResponse.body).toHaveProperty("message")
    });
    
    it('should return status 500 and a error', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        const myResponse = await response(0)
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });
    
});

export {}