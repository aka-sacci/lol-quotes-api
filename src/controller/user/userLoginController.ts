import { Request, Response, NextFunction } from "express";
import { iController, iReturnObject, iService, iAuthRequestBody } from "../../@types/myTypes";
import 'dotenv/config'
const jwt = require('jsonwebtoken')
const userLoginService = require('../../service/users/userLoginService')
const UserLoginService: iService = new userLoginService

class userLoginController implements iController {
    async handle(req: Request<{}, {}, iAuthRequestBody>, res: Response, next?: NextFunction): Promise<void> {
        var result: iReturnObject
        const { email, password } = req.body
        result = await UserLoginService.execute({
            userData: {
                email,
                password
            }
        })

        switch (result.success) {
            case true:
                if (result.hasRows === true) {
                    const token = jwt.sign({ email: email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    )
                    res.status(200).cookie("JWT", token, {
                        path: "/",
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true
                    }).send()
                } else {
                    res.status(404).json({ wrongInput: result.wrongInput })
                }
                break;
            case false:
                res.status(500).json({ error: result.error })
                break

        }
    }
}

module.exports = userLoginController