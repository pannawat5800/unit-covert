import { ObjectId } from "mongoose"

export enum Collection {
    SystemUnit = "system_units"
}

export enum ContextSystem {
    Distance = "distance",
    Area = "area",
    Temperature = "temperature",
    Volume = "volume",
    Mass = "mass",
    Speed = "speed"
}

export type BaseSchema = {
    _id?: ObjectId
    date_create: Date,
    date_update: Date,
    _v?: number
}

export enum TypeMeasurement {
    Metric_SI = "Metric_SI",
    Imperial = "Imperial",
    Customized = 'Customized'
}

export enum ResponseStatus {
    SUCCESS = "Success",
    BAD_REQUEST = "Bad_Request",
    NOT_FOUND_API = "Not_Found_Api",
    NOT_FOUND_RESOURCE = "Not_Founed_Resource",
    RESOURCE_CONFLICT = "Resource_Conflict",
    INTERNAL_ERROR = "Internal_Error",
    NON_AUTH = "Non_Authenticatoin"
}


export interface ErrorApiModel  {
    code: number
    status: ResponseStatus
    message?: string;
    error?: string;
}