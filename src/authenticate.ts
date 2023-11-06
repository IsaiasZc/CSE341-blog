import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const Oauth = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((user: any, done) => done(null, user))
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `http://${process.env.DOCS_HOST}/google/callback`
  },
  function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user)
    // })
    console.log(profile)
    cb(null, profile)
  }
  ))
  
}

export default Oauth