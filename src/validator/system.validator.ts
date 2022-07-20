import Joi from 'joi'
import { ContextSystem, TypeMeasurement } from '@models/share.model'

export const CreateSystemSchema = Joi.object({
    "context": Joi.string()
        .valid(...Object.values(ContextSystem))
        .required(),
    "group_type": Joi.string()
        .valid(...Object.values(TypeMeasurement))
        .required(),
    "unit": Joi.string().required(),
    "IS_value": Joi.number().required(),
    "IS_unit": Joi.string().required()
})

export const CovertSystemUnitSchema = Joi.object({
    "value": Joi.number().required(),
    "from": Joi.string().required(),
    "to": Joi.string().required()
})