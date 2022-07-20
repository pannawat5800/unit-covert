import express from 'express'
import env from '@core/env.core'
import initialMongoDB from '@core/db.core'
import apiRouter from '@routes/index.router'
import { errorHandleApi, errorNotFoundApi } from '@core/error_handle.core'
const app = express()
const port = env.Port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter)
app.use(errorHandleApi)
app.use('*', errorNotFoundApi)


async function RunServer(): Promise<void> {
    try {
        await initialMongoDB();
        app.listen(port, () => console.info(`server is runing on port: ${port}`))

    } catch (error) {
        console.error('Start server failed.')
        console.error(error)
    }
}

RunServer()

export default app