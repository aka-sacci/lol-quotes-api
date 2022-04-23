import jwt from "jsonwebtoken";
import 'dotenv/config'

const request = require('supertest')
const testServer = require("../../../src/server")

//Import database
const database = require('../../../src/database')

describe("isAuthedController", () => {
    var token: string
    var expiredToken: string
    var connection: any

    //Response function
    const response = async (myToken: string | undefined) => {
        if (myToken != undefined) {
            const myRequest = await request(testServer)
                .get("/isauthed")
                .set('Cookie', `JWT=${myToken}`)
                .send()
            return myRequest
        } else {
            const myRequest = await request(testServer)
                .get("/isauthed")
                .send()
            return myRequest
        }
    }

    beforeAll(async () => {
        connection = await database

        token = jwt.sign({ email: "teste@test.com" },
            String(process.env.JWT_SECRET),
            { expiresIn: '10s' }
        )

        expiredToken = jwt.sign({ email: "expiredToken" },
            String(process.env.JWT_SECRET),
            { expiresIn: '1ms' }
        )
    })

    afterAll(async () => {
        await connection.connection.close()
    })

    it("should return status 200 with a valid token", async () => {
        const myResponse = await response(token)
        expect(myResponse.status).toBe(200)
    })

    it("should return status 403 with a expired token", async () => {
        const myResponse = await response(expiredToken)
        expect(myResponse.status).toBe(403)
    })

    it("should return status 401 with a missing token", async () => {
        const myResponse = await response(undefined)
        expect(myResponse.status).toBe(401)
    })
})