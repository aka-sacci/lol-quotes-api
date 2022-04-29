import jwt from "jsonwebtoken";
import 'dotenv/config'
import { cookie } from "express-validator";

const request = require('supertest')
const testServer = require("../../../src/server")

//Import database
const database = require('../../../src/database')

describe('logoutController', () => {
    var token: string
    var connection: any

    //Response function
    const response = async (myToken: string | undefined) => {
        if (myToken != undefined) {
            const myRequest = await request(testServer)
                .get("/logout")
                .set('Cookie', `JWT=${myToken}`)
                .send()
            return myRequest
        } else {
            const myRequest = await request(testServer)
                .get("/logout")
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
    })

    afterAll(async () => {
        await connection.connection.close()
    })

    it('should return status 200 and expire the existing JWT', async () => {
        const myResponse = await response(token)
        expect(myResponse.status).toBe(200)
        expect(myResponse.headers).toHaveProperty('set-cookie')
        expect(myResponse.headers['set-cookie']).toContain('JWT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')

    });

    it('should return status 200 and expire the JWT, even though it doesn´t exists', async () => {
        const myResponse = await response(token)
        expect(myResponse.status).toBe(200)
        expect(myResponse.headers).toHaveProperty('set-cookie')
        expect(myResponse.headers['set-cookie']).toContain('JWT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
    });
});