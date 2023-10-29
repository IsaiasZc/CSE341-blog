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
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
