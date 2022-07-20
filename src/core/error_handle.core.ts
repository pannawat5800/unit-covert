import { ErrorApiModel, ResponseStatus } from "@models/share.model"
import { NextFunction, Request, Response } from "express"

export class ErrorModelCore {

    inValidAuth(message: string): ErrorApiModel {
        return {
            code: 401,
            status: ResponseStatus.NON_AUTH,
            message: message || ""
        }
    }

    badRequest(message: string, error?: string): ErrorApiModel {
        return {
            code: 404,
            status: ResponseStatus.BAD_REQUEST,
            error,
            message: message || ""
        }
    }

    notFoundAPI(message: string): ErrorApiModel {
        return {
            code: 404,
            status: ResponseStatus.NOT_FOUND_API,
            message: message || "Resoure is not found."
        }
    }

    notFoundResoure(message: string): ErrorApiModel {
        return {
            code: 404,
            status: ResponseStatus.NOT_FOUND_RESOURCE,
            message: message || ""
        }
    }

    resouresConflict(message: string): ErrorApiModel {
        return {
            code: 409,
            status: ResponseStatus.RESOURCE_CONFLICT,
            message: message || ""
        }
    }

    internalError(message?: string): ErrorApiModel {
        return {
            code: 500,
            status: ResponseStatus.INTERNAL_ERROR,
            message: message || "The system is error"
        }
    }


}

function instanceOfErrorApiModel(object: any): object is ErrorApiModel {
    return 'code' in object && 'status' in object;
}

export const errorHandleApi = (error: any, request: Request, response: Response, next:NextFunction): Promise<void> => {
    console.log(error)
    if (instanceOfErrorApiModel(error)) {
        response.status(error.code as number).json(error)
        return 
    }
    const defaultError = new ErrorModelCore()
    const internalError = defaultError.internalError()
    response.status(500).json(internalError)
}


export const errorNotFoundApi = (request: Request, response: Response) => {
    const defaultError = new ErrorModelCore()
    const apiNotFoundError = defaultError.notFoundAPI('Api is not found.')
    response.status(404).json(apiNotFoundError)
}