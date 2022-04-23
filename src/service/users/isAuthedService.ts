import { iReturnObject, iService } from "../../@types/myTypes";
import jwt from "jsonwebtoken";
import 'dotenv/config'

class isAuthedService implements iService {
    returnObject: iReturnObject;
    constructor(returnObject: iReturnObject) {
        this.returnObject = returnObject
    }

    async execute(params: { token: string }): Promise<iReturnObject> {
        const { token } = params
        jwt.verify(token, String(process.env.JWT_SECRET), (err: any, decoded: any) => {
            if (err) {
                const tokenError = new Error()
                tokenError.message = err.message
                tokenError.name = err.name
                this.returnObject = {
                    success: false,
                    error: tokenError
                }

            } else {
                this.returnObject = { success: true }
            }
        })

        return this.returnObject
    }
}

module.exports = isAuthedService