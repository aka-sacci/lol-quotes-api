import { iReturnObject, iService, iCreateUserData } from "../../@types/myTypes";
import bcrypt from 'bcrypt'
const createUserDatabase = require('../../database')
const createUserModel = createUserDatabase.model('users')

class createUserService implements iService {
    returnObject: iReturnObject;
    constructor(returnObject: iReturnObject) {
        this.returnObject = returnObject
    }

    async execute(params: { createUserData: iCreateUserData }): Promise<iReturnObject> {
        try {
            const emailExist = await this.checkEmail(params.createUserData.email)
            if (emailExist) this.returnObject = {
                success: false,
                error: {
                    name: "ERR_MAIL_ALREADY_EXITS",
                    message: "The email already exists!",
                }
            }
            else {
                const successOnCreateUser = await this.createUser(params.createUserData)
                this.returnObject = {
                    success: successOnCreateUser
                }
            }
        } catch (err: any) {
            this.returnObject = {
                success: false,
                error: {
                    ...err
                }
            }
            return this.returnObject

        }
        return this.returnObject
    }

    async checkEmail(email: string): Promise<boolean> {
        const result: boolean = await createUserModel
            .find({
                email: email
            })
            .count()
            .then((qtdEmails: number) => {
                if (qtdEmails > 0) return true
                else return false
            })
            .catch((err: Error) => {
                const errorToBeThrown = new Error
                errorToBeThrown.message = err.message
                errorToBeThrown.name = err.name
                throw errorToBeThrown
            })
        return result
    }

    async createUser(params: iCreateUserData): Promise<boolean> {
        const { email, password, name } = params
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const ret = new createUserModel({
            email: email,
            password: hashedPassword,
            name: name
        })
            .save()
            .then(() => true)
            .catch((err: Error) => {
                const errorToBeThrown = new Error
                errorToBeThrown.message = err.message
                errorToBeThrown.name = err.name
                throw errorToBeThrown
            })

        return ret
    }


}

module.exports = createUserService