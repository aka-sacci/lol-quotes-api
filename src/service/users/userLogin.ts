import { iService, iReturnObject, iUserData } from "../../@types/myTypes";
const userLoginDatabase = require('../../database')
const userLoginModel = userLoginDatabase.model('users')


class userLogin implements iService {
    returnObject: iReturnObject
    constructor(returnObject: iReturnObject) {
        this.returnObject = returnObject
    }
    async execute(params: { userData: iUserData }): Promise<iReturnObject> {
        const { email, password } = params.userData
       

        try {
            const isUserValid = await this.validateUser(email, password)
            if (isUserValid === 0) this.returnObject = {
                success: true,
                hasRows: false,
                message: "Usuário não encontrado!"
            }
            else this.returnObject = {
                success: true,
                hasRows: true,   
            }
            return this.returnObject
        } catch (err: any) {
            return {
                success: false,
                error: {
                    ...err
                }
            }
        }

        return this.returnObject
    }

    async validateUser(email: string, password: string): Promise<number> {
        const result = await userLoginModel
        .count({
            email: email,
            password: password
        })
        .then((result: number) => result)
        .catch((err: Error) => {
            const errorToBeThrown = new Error
            errorToBeThrown.message = err.message
            errorToBeThrown.name = err.name
            throw errorToBeThrown
        })
        return result
    }
}

module.exports = userLogin