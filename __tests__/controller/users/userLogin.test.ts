import { iMockData } from "../../../src/@types/myTypes"

//SUPERTEST
const request = require('supertest')
const testServer = require("../../../src/server")

//Import Mocks
const mockUsers = require('../../../src/utils/mocks/mockUsers')
const mockedUsers: iMockData = new mockUsers

//Import database
const database = require('../../../src/database')
describe('userLoginController', () => {

    var connection: any
    const response = async (email: string, password: string) => {
        const myRequest = await request(testServer)
            .post("/authuser")
            .send({
                email: email,
                password: password
            })
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedUsers.insert(connection)
    })

    it('should return status 200 and a JWT token', async () => {
        const myResponse = await response("testmail@mail.com", "testpassword")
        expect(myResponse.status).toBe(200)
        expect(myResponse.body).toHaveProperty("token")
    });
    it('should return status 404 and a message', async () => {
        const myResponse = await response("wrongtestmail@mail.com", "wrongtestpassword")
        expect(myResponse.status).toBe(404)
        expect(myResponse.body).toHaveProperty("message")
    })
    it('should return status 500 and a error', async () => {
        await mockedUsers.delete(connection)
        await connection.connection.close()
        const myResponse = await response("testmail@mail.com", "testpassword")
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });

});