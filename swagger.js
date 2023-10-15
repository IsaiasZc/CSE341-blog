const swaggerAutogen = require('swagger-autogen')

swaggerAutogen()

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 - Blog API'
  },
  host: process.env.DOCS_HOST,
  schemes: [process.env.DOCS_SCHEME]
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
