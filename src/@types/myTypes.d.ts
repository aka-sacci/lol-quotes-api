import { Request, Response, NextFunction } from 'express'

interface iReturnObject {
    success?: boolean,
    hasRows?: boolean,
    message?: string,
    quoteData?: object | number,
    qtd?: object
    error?: Error
}

interface iController {
    async handle(req: Request, res: Response, next?: NextFunction): Promise<void>,
    
}

interface iService {
    async execute(id?: number): Promise<object>,
    async getQuoteById?(id: number): Promise<object>,
    async getQuoteQtd?(): Promise<object>,
    async getAllQuotes?(): Promise<object>,
    quoteData: object | number,
    returnObject: iReturnObject

}

export {iController, iReturnObject, iService}

