import mongoose from 'mongoose'
import { BaseSchema, Collection, ContextSystem, TypeMeasurement } from '@models/share.model'
import { SystemUnit } from '@models/unit.model';

const { Schema } = mongoose
const SystemUnitSchema = new Schema({
    context: {
        type: String,
        require: true,
        enum: [
            ContextSystem.Distance,
            ContextSystem.Area,
            ContextSystem.Temperature,
            ContextSystem.Volume,
            ContextSystem.Speed,
            ContextSystem.Mass
        ]
    },
    group_type: {
        type: String,
        require: true,
        enum: [
            TypeMeasurement.Metric_SI,
            TypeMeasurement.Imperial,
            TypeMeasurement.Customized
        ]
    },
    unit: {
        type: String
    },
    IS_value: {
        type: Number,
        require: true,
    },
    IS_unit: {
        type: String,
        require: true,
    },

    date_create: { type: Date, default: Date.now, index: true },
    date_update: { type: Date, default: Date.now, index: true }
}, { 
    toJSON: {
        transform: function (doc, ret) {
            delete ret._v;
            delete ret.date_create;
            delete ret.date_update
        }
    },
    timestamps: { createdAt: "date_create", updatedAt: 'date_update' } 
});

const SystemUnitModel = mongoose.model<SystemUnit & BaseSchema>(Collection.SystemUnit, SystemUnitSchema)
export default SystemUnitModel