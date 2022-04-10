import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'

function verifyJWTAuthRoute(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (!token) return next();
    else {
        jwt.verify(token, String(process.env.JWT_SECRET), (err: any, decoded: any) => {
            if (err) return next();

            res.status(302).json({ message: "User is already authenticated!" })
        })
    }

}

function verifyJWT(req: Request, res: Response, next: NextFunction): void {

}

export { verifyJWT, verifyJWTAuthRoute }
