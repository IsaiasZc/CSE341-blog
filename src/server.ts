import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import router from './routes/index'
import cors from 'cors'
import passport from 'passport'
import Oauth from './authenticate'
import session from 'express-session'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5050

const options = {
  explorer: true
}

// connect to database
connectDB()
// prepare OAuth
Oauth()

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
  .use(cors())
  .use(express.json())
  .use(passport.initialize())
  .use(session({
    secret: 'patito',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.session())
  .use('/', router)

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   // res.redirect('/')
//   res.end('Logged in!')
// })

app.listen(PORT, () => console.log(`It's working on port ${PORT}`))
