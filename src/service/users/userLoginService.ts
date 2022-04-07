import { iService, iReturnObject, iUserData, iReturnValidateUser } from "../../@types/myTypes";
const bcrypt = require('bcrypt');
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
            if (isUserValid.isValid === false) this.returnObject = {
                success: true,
                hasRows: false,
                wrongInput: isUserValid.wrongInput
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

    }

    async validateUser(email: string, password: string): Promise<iReturnValidateUser> {
        const result = await userLoginModel
            .findOne({
                email: email,
            })
            .then((queryResult: any) => {
                if (queryResult === null) {
                    const returnValidateUser: iReturnValidateUser = {
                        isValid: false,
                        wrongInput: "email"
                    }
                    return returnValidateUser
                }
                else {
                    const returnedPasswordHash = queryResult.password
                    var isValid: boolean = bcrypt.compareSync(password, returnedPasswordHash);
                    const returnValidateUser: iReturnValidateUser = {
                        isValid,
                        wrongInput: isValid ? null : "password"
                    }
                    return returnValidateUser
                }
            })
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