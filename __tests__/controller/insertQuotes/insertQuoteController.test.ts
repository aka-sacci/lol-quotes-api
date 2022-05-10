import { iCreateQuote, iCreateUserData, iMockData } from "../../../src/@types/myTypes"

const request = require('supertest')
const testServer = require("../../../src/server")

//Import Mocks
const mockQuotes = require('../../../src/utils/mocks/mockQuotes')
const mockedData: iMockData = new mockQuotes

//Import database
const database = require('../../../src/database')

describe('insertQuoteController', () => {
    var connection: any
    const response = async ({ champion, quote, length }: iCreateQuote | any): Promise<any> => {
        const myRequest = await request(testServer)
            .post("/insertquote")
            .send({
                champion,
                quote,
                length
            })
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedData.insert(database)

    })

    it('should insert successfully a new quote sending status 201', async () => {
        const myResponse = await response({ champion: "Champion Test 1", quote: "Quote Test 1", length: 1000 })
        expect(myResponse.status).toBe(201)
    });

    it('should fail at the insertion of a quote that already exists, throwing status 409', async () => {
        const myResponse = await response({ champion: "Champion Test 0", quote: "Quote Test 0", length: 1000 })
        expect(myResponse.status).toBe(409)
        expect(myResponse.body).toHaveProperty("error")
        expect(myResponse.body.error.name).toBe("ERR_QUOTE_ALREADY_EXISTS")
    });

    it('should fail on the insertion of a quote when any of the fields is missing, throwing status 400', async () => {
        const myResponse = await response({ quote: "Quote Test 0", length: 1000 })
        expect(myResponse.status).toBe(400)
        expect(myResponse.body).toHaveProperty("error")
        expect(myResponse.body.error.name).toBe("ERROR_MISSING_FIELD")
    });

    it('should fail on the insertion of a quote when any of the fields is blank, throwing status 400', async () => {
        const myResponse = await response({ champion: "", quote: "Quote Test 0", length: 1000 })
        expect(myResponse.status).toBe(400)
        expect(myResponse.body).toHaveProperty("error")
        expect(myResponse.body.error.name).toBe("ERROR_BLANK_FIELD")
    });

    it('should return status 500 and a connection error', async () => {
        await mockedData.delete(connection)
        await connection.connection.close()
        const myResponse = await response({
            champion: "Champion Test 0", quote: "Quote Test 0", length: 1000
        })
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });

});