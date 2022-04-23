import { Request, Response, NextFunction } from "express";
import { iController, iService, iCreateUserData, iReturnObject } from "../../@types/myTypes";
import 'dotenv/config';
const jwt = require('jsonwebtoken')
const createUserService = require('../../service/users/createUserService')
const CreateUserService: iService = new createUserService

class createUserController implements iController {
    async handle(req: Request<{}, {}, iCreateUserData>, res: Response, next?: NextFunction): Promise<void> {
        var result: iReturnObject
        result = await CreateUserService.execute({
            createUserData: req.body
        })

        switch (result.success) {
            case true:
                const token = jwt.sign({ email: req.body.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
                res.status(201).cookie("JWT", token, {
                    path: "/",
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                }).send()
                break;
            case false:
                if (result.error?.name === "ERR_MAIL_ALREADY_EXITS") res.status(409).json({ error: result.error })
                else res.status(500).json({ error: result.error })
                break

        }

    }
}

module.exports = createUserController