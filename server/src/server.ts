import app  from './app'
import env from './utils/validateEnv'
import mongoose from 'mongoose'

const PORT = env.PORT

mongoose.connect(env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log('Mongoose connected');
        app.listen(PORT, () => {
            console.log('server is runing');
            
        })
    })
    .catch(console.error)

