const request = require('supertest')
const testServer = require("../src/server")

describe('index', () => {
    it("Should return status 200", async () => {
        const response = await request(testServer)
        .get("/test")
        .send()
        expect(response.status).toBe(200)
    })
});

export {}