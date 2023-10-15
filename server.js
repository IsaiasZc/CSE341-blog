const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connect.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const router = require('./routes/index.js')
const cors = require('cors')

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
