import { Request, Response } from "express"
import SystemUnitModel from "@schema/systemUnits.schema"
import { convertValueUnit } from "@util/units.utile"
import { SystemUnit } from "@models/unit.model"
import { ErrorModelCore } from "@core/error_handle.core"
import { CreateSystemSchema } from "@validate/system.validator"

const errorModelCore = new ErrorModelCore()

export const CreateSystem = async (request: Request, response: Response): Promise<void> => {
    const data = request.body
    const { error } = CreateSystemSchema.validate(data)
    if (error) throw errorModelCore.badRequest(error.toString())

    const result = await SystemUnitModel.findOneAndUpdate(
        { 
            context: data.context, 
            group_type: data.group_type 
        }, 
        data, 
        { new: true, upsert: true}
    )
    response.json(result)
}

export const UpdateSystem = async (request: Request, response: Response): Promise<void> => {
    const { _id, ...data } = request.body
    const result = await SystemUnitModel.findByIdAndUpdate(_id, data, { new: true })
    response.json(result)
}

export const GetSystemByUnit = async (request: Request, response: Response): Promise<void> => {
    const { unit } = request.params
    if (!unit) throw errorModelCore.badRequest('unit is required.')

    const result = await SystemUnitModel.findOne({ unit })
    response.json(result)
}

export const DeleteSystem = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id
    if (!id) throw errorModelCore.badRequest('id is required.')

    const result = await SystemUnitModel.findByIdAndDelete(id)
    response.json(result)
}

export const GetGroupOfSystem = async (request: Request, response: Response): Promise<void> => {
    const { context } = request.params

    const result = await SystemUnitModel.aggregate([
        {
            $match: context ? {
                context: context
            } : {}
        },
        {
            $group: {
                _id: { context: "$context" },
                units: { $push: "$$ROOT" }
            }
        }
    ]).exec()
    response.json(result)
}

export const ConvertUnit = async (request: Request, response: Response): Promise<void> => {
    const { value, from, to } = request.body as { value: number, from: string, to: string }

    if (from === to) {
        response.json({ value: value, unit: to })
        return
    }

    const [systemFrom, systemTo] = await Promise.all<SystemUnit>([
        SystemUnitModel.findOne({ unit: from }).lean<SystemUnit>(),
        SystemUnitModel.findOne({ unit: to }).lean<SystemUnit>(),
    ])

    if (!systemFrom || !systemTo) {
        throw errorModelCore.notFoundResoure('Unit is not found')
    }

    if (systemFrom.IS_unit !== systemTo.IS_unit) {
        throw errorModelCore.badRequest('Unit is not the same dimesion.')
    }

    const result = convertValueUnit(value, systemFrom.IS_value, systemTo.IS_value)
    response.json({
        value: result,
        unit: to
    })
}
