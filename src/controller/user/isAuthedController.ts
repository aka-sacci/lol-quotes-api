import { Request, Response, NextFunction } from "express";
import { iController, iReturnObject, iService } from "../../@types/myTypes";
import 'dotenv/config'
const isAuthedService = require('../../service/users/isAuthedService')
const IsAuthedService: iService = new isAuthedService

class isAuthedController implements iController {
    async handle(req: Request, res: Response, next?: NextFunction): Promise<void> {
        var result: iReturnObject
        const token = req.cookies['JWT']
        if (token != undefined) {
            result = await IsAuthedService.execute({
                token
            })

            switch (result.success) {
                case true:
                    res.status(200).send()
                    break;
                case false:
                    res.status(403).send()
                    break
            }
        } else {
            res.status(401).send()
        }
    }
}

module.exports = isAuthedController