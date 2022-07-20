import env from './env.core'
import mongoose from 'mongoose';

const initialMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.DB_Url, { dbName: env.DB_Name });
    } catch (error) {
        throw error
    }
}

export default initialMongoDB