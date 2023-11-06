import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
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