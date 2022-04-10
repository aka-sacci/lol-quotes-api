import { error } from "console";
import { iMockData, iReturnObject, iService } from "../../../src/@types/myTypes";

//Import database
const database = require('../../../src/database')

//Import service
const createUserService = require('../../../src/service/users/createUserService')
const service: iService = new createUserService

//Import Mocks
const mockUsers = require('../../../src/utils/mocks/mockUsersCrypted')
const mockedUsers: iMockData = new mockUsers


describe('createUserService', () => {
    var connection: any
    var result: iReturnObject

    beforeAll(async () => {
        connection = await database
        await mockedUsers.insert(connection)
    })

    it('should be successful in the new user creation', async () => {
        result = await service.execute({
            createUserData: {
                email: "testcreate@mail.com",
                password: "testpassword",
                name: "Test User"
            }
        })
        expect(result.success).toBe(true)
    });

    it('should fail in the new user creation, because it already have a user with this email', async () => {
        result = await service.execute({
            createUserData: {
                email: "testmail@mail.com",
                password: "testpassword",
                name: "Test User"
            }
        })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty('error')
        expect(result.error?.name).toBe("ERR_MAIL_ALREADY_EXITS")
    });

    it('should throw a connection error', async () => {
        await mockedUsers.delete(connection)
        await connection.connection.close()
        result = await service.execute({
            createUserData: {
            email: "testmail@mail.com",
            password: "testpassword",
            name: "Test name"
            }
        })
        expect(result.success).toBe(false)
        expect(result).toHaveProperty("error")
        expect(result.error?.name).not.toBe("ERR_MAIL_ALREADY_EXITS")
    });


});

export { }