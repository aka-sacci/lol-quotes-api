import { iReturnObject, iMockData, iService } from '../../../src/@types/myTypes';

//Import database
const database = require('../../../src/database')

//Import service
const userLoginService = require('../../../src/service/users/userLoginService')
const service: iService = new userLoginService

//Import Mocks
const mockUsers = require('../../../src/utils/mocks/mockUsersCrypted')
const mockedUsers: iMockData = new mockUsers

describe('userLoginService', () => {
    var connection: any
    var result: iReturnObject

    beforeAll(async () => {
        connection = await database
        await mockedUsers.insert(connection)


    })
    it('should be successfull in authentication', async () => {
        result = await service.execute({
            userData: {
                email: "testmail@mail.com",
                password: "testpassword",
            }
        })
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(true)
    });

    it('should fail in password authentication', async () => {
        result = await service.execute({
            userData: {
                email: "testmail@mail.com",
                password: "wrongtestpassword",
            }
        })
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(false)
        expect(result).toHaveProperty("wrongInput")
        expect(result.wrongInput).toBe("password")
    });

    it('should fail in mail authentication', async () => {
        result = await service.execute({
            userData: {
                email: "wrongtestmail@mail.com",
                password: "testpassword",
            }
        })
        expect(result.success).toBe(true)
        expect(result.hasRows).toBe(false)
        expect(result).toHaveProperty("wrongInput")
        expect(result.wrongInput).toBe("email")
    });

    it('should throw a connection error', async () => {
        await mockedUsers.delete(connection)
        await connection.connection.close()
        result = await service.execute({
            userData: {
            email: "testmail@mail.com",
            password: "testpassword",
            }
        })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
    });
});

export { }