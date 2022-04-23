import { iReturnObject, iService } from '../../../src/@types/myTypes';
import jwt from "jsonwebtoken";
import 'dotenv/config'

//Import service
const isAuthedService = require('../../../src/service/users/isAuthedService')
const service: iService = new isAuthedService


describe('isAuthedService', () => {
    var token: string
    var expiredToken: string
    var result: iReturnObject

    beforeAll(() => {
        token = jwt.sign({ email: "teste@test.com" },
            String(process.env.JWT_SECRET),
            { expiresIn: '10s' }
        )

        expiredToken = jwt.sign({ email: "expiredToken" },
            String(process.env.JWT_SECRET),
            { expiresIn: '1ms' }
        )
    })
    it('should successfully check the JWT', async () => {
        result = await service.execute({ token })
        expect(result.success).toBe(true)
    })
    it('should fail in the JWT check, returning a JsonWebTokenError', async () => {
        result = await service.execute({ token: "wrongToken" })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
        expect(result.error?.name).toBe('JsonWebTokenError')
    })
    it('should fail in the JWT check, returning a TokenExpiredError', async () => {
        result = await service.execute({ token: expiredToken })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
        expect(result.error?.name).toBe('TokenExpiredError')
    })
})

export { }