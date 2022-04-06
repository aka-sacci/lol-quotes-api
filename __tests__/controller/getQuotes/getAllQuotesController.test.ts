import { iMockData } from "../../../src/@types/myTypes"

//SUPERTEST
const request = require('supertest')
const testServer = require("../../../src/server")

//Import Mocks
const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

//Import database
const database = require('../../../src/database')
describe('getAllQuotesController', () => {
    
    var connection: any
    const response = async (): Promise<any> => {
        const myRequest = await request(testServer)
            .get("/getallquotes/")
            .send()
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedData.insert(connection)
    })

    it('should return status 200 and all the quotes', async () => {
        const myResponse = await response()
        expect(myResponse.status).toBe(200)
        expect(myResponse.body).toHaveProperty("quotes")
    });

    it('should return status 500 and a error', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        const myResponse = await response()
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });
});

export { }