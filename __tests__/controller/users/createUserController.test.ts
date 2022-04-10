import { iCreateUserData, iMockData } from "../../../src/@types/myTypes"

const request = require('supertest')
const testServer = require("../../../src/server")

//Import Mocks
const mockUsers = require('../../../src/utils/mocks/mockUsersCrypted')
const mockedUsers: iMockData = new mockUsers

//Import database
const database = require('../../../src/database')

describe('createUserController', () => {
    var connection: any
    const response = async (params: iCreateUserData) => {
        const { email, password, name } = params
        const myRequest = await request(testServer)
            .post("/createuser")
            .send({
                email: email,
                password: password,
                name: name
            })
        return myRequest
    }

    beforeAll(async () => {
        connection = await database
        await mockedUsers.insert(connection)
    })

    it('should return status 201 and a JWT token', async () => {
        const myResponse = await response({
            email: "testcreate@mail.com",
            password: "testpassword",
            name: "Test User"
        })
        expect(myResponse.status).toBe(201)
        expect(myResponse.body).toHaveProperty("token")
    });

    it('should return status 409 and an error from emails conflict', async () => {
        const myResponse = await response({
            email: "testmail@mail.com",
            password: "testpassword",
            name: "Test User"
        })
        expect(myResponse.status).toBe(409)
        expect(myResponse.body).toHaveProperty("error")
    })

    it('should return status 500 and a connection error', async () => {
        await mockedUsers.delete(connection)
        await connection.connection.close()
        const myResponse = await response({
            email: "testmail@mail.com",
            password: "testpassword",
            name: "Test User"
        })
        expect(myResponse.status).toBe(500)
        expect(myResponse.body).toHaveProperty("error")
    });
});
