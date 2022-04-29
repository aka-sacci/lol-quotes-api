import { Request, Response, NextFunction } from "express";
import { iController, iReturnObject, iService } from "../../@types/myTypes";

class logoutController implements iController {
    async handle(req: Request, res: Response, next?: NextFunction): Promise<void> {
        res.clearCookie('JWT')
        res.status(200).send()
    }
}

module.exports = logoutController