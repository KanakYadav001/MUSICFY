import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.js';
import  { Strategy as  GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import config from './config/config.js';


const app = express();



app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());


passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {

  return done(null, profile);
}));


app.use("/api/auth" ,authRouter);



export default app;