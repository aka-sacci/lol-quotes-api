//SUPERTEST
const request = require('supertest')
const testServer = require("../../src/server")

//Import Mocks
const mockQuotes = require('../../src/utils/mocks/mockQuotes')
const mockedData = new mockQuotes

//Import database
const database = require('../../src/database')
describe('getQtdQuotesController', () => {
    var connection: any
    const response = async (): Promise<any> => {
        const myRequest = await request(testServer)
            .get("/getqtdquotes/")
            .send()
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedData.insertMockedQuotes(connection)
    })

    it('should return status 200 and the quantity of registers', async () => {
        const myResponse = await response()
        expect(myResponse.status).toBe(200)
        expect(myResponse.body).toHaveProperty("qtd")
        expect(myResponse.body.qtd).toBe(1)
    });

    it('should return status 500 and a error', async () => {
        await mockedData.deleteMockedQuotes(connection)
        await connection.connection.close()
        const myResponse = await response()
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });
});

export { }