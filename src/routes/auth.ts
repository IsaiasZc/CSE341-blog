import express from 'express'
import passport from 'passport'
import { validateLogged } from './validator'

const router = express.Router()

router.get('/', validateLogged, passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: err })
    }
    res.redirect('/')
  })
})

export default router