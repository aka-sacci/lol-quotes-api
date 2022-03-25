const request = require('supertest')
import { Response } from 'express'
const testServer = require("../src/server")

describe('index', () => {
    it("Should return status 200", async () => {
        const response = await request(testServer)
        .get("/test")
        .send()
        expect(response.status).toBe(200)
    })

    it('should return a json with success: true', async () => {
        const response = await request(testServer)
        .get("/test")
        .send()
        expect(response.body.success).toBe(true)
    });
});