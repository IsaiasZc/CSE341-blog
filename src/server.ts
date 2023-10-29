import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import router from './routes/index'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5050

const options = {
  explorer: true
}

// connect to database
connectDB()

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
  .use(cors())
  .use(express.json())
  .use('/', router)

app.listen(PORT, () => console.log(`It's working on port ${PORT}`))
