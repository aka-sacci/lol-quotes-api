import { Request, Response, NextFunction } from 'express'

interface iController {
    async handle(req: Request, res: Response, next?: NextFunction): Promise<void>,
    
}

interface iService {
    async execute(params?: iExecuteParams): Promise<object>,
    async getQuoteById?(id: number): Promise<object>,
    async getQuoteQtd?(): Promise<object>,
    async getAllQuotes?(): Promise<object>,
    async validateUser?(email: string, password: string): Promise<number>
    quoteData?: object | number,
    returnObject: iReturnObject

}

interface iExecuteParams {
    id?: number | string,
    userData?: iUserData
}

interface iUserData {
    email: string,
    password: string
}

interface iReturnObject {
    success?: boolean,
    hasRows?: boolean,
    message?: string,
    quoteData?: object | number,
    qtd?: object
    error?: Error
}

interface iMockData {
    async insert(connection: any): Promise<void>
    async delete(connection: any): Promise<void>
}



export {
    iController,
    iReturnObject,
    iService,
    iMockData,
    iUserData
}

