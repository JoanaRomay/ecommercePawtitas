import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Usuario } from "../models/index.js";
import { Op } from "sequelize"; // necesario para el [Op.or]
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar usuario por google_id o email
    let user = await Usuario.findOne({ 
      where: { 
        [Op.or]: [
          { google_id: profile.id },
          { email: profile.emails[0].value }
        ]
      }
    });

    if (!user) {
      // Usuario nuevo → crear
      user = await Usuario.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
        rolId: 2 // USER por defecto
      });
    } else if (!user.google_id) {
      // Usuario existente con email → actualizar google_id
      user.google_id = profile.id;
      await user.save();
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

export default passport;
