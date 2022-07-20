import { ConvertUnit, CreateSystem, DeleteSystem, GetGroupOfSystem, GetSystemByUnit, UpdateSystem } from "@controller/unit.controller";
import { Router } from "express";
import asyncRequestHandler from '@util/asyncHandler.util'
const apiRouter = Router()

apiRouter.put('/systems', asyncRequestHandler(CreateSystem))
apiRouter.post('/systems',  asyncRequestHandler(UpdateSystem))
apiRouter.get('/systems/units/:unit', asyncRequestHandler(GetSystemByUnit))
apiRouter.delete('/systems/:id', asyncRequestHandler(DeleteSystem))
apiRouter.get('/systems', asyncRequestHandler(GetGroupOfSystem))
apiRouter.get('/systems/context/:context', asyncRequestHandler(GetGroupOfSystem))
apiRouter.post('/systems/convert', asyncRequestHandler(ConvertUnit))


export default apiRouter