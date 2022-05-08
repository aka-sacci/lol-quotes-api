import { Request, Response, NextFunction } from 'express'

interface iController {
    async handle(req: Request, res: Response, next?: NextFunction): Promise<void>,
    
}

interface iService {
    async execute(params?: iExecuteParams): Promise<object>,
    async getQuote?(quote: string): Promise<object>,
    async getQuoteQtd?(): Promise<object>,
    async getAllQuotes?(): Promise<object>,
    async insertQuote?(iCreateQuote): Promise<object>,
    async validateUser?(email: string, password: string): Promise<iReturnValidateUser>
    async checkEmail?(email: string): Promise<boolean>,
    async createUser?(params: iCreateUserData): Promise<boolean>,
    quoteData?: object | number,
    returnObject: iReturnObject

}

interface iExecuteParams {
    quote?: string,
    createQuote?: iCreateQuote
    userData?: iUserData,
    createUserData?: iCreateUserData,
    token?: string,
}

interface iUserData {
    email: string,
    password: string
}

interface iCreateUserData {
    email: string,
    password: string,
    name: string
}

interface iCreateQuote {
    quote: string,
    length: number,
    champion: string
}

interface iReturnObject {
    success?: boolean,
    hasRows?: boolean,
    message?: string,
    quoteData?: object | number,
    qtd?: object
    error?: Error,
    wrongInput?: string | null
}

interface iMockData {
    async insert(connection: any): Promise<void>
    async delete(connection: any): Promise<void>
}

interface iReturnValidateUser {
    isValid: boolean,
    wrongInput: null | "password" | "email"
}

interface iAuthRequestBody {
    email: string, 
    password: string
}


export {
    iController,
    iReturnObject,
    iService,
    iMockData,
    iUserData,
    iReturnValidateUser,
    iAuthRequestBody,
    iCreateUserData,
    iExecuteParams,
    iCreateQuote
}

