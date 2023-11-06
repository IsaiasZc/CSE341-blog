import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from './controllers/users'

const Oauth = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((id: string, done) => {
    try {
      const user = User.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.DOCS_SCHEME}://${process.env.DOCS_HOST}/google/callback`
  },
  async  (accessToken, refreshToken, profile, cb) => {

    const newUser = {
      googleId: profile.id,
      email: profile.emails?.[0].value,
      username: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      image: profile.photos?.[0].value
    }

    try {
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        cb(null, user)
      } else {
        user = await User.create(newUser)
        cb(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }
  ))
  
}

export default Oauth