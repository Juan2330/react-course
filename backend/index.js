require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || `${FRONTEND_URL}/auth/github/callback`;

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
];

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});
await redisClient.connect(); 

app.use(cors({
    origin: allowedOrigins,
    credentials: true,         
    exposedHeaders: ['set-cookie']
}));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        domain: 'shopi-backend.onrender.com',
        maxAge: 86400000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(process.env.FRONTEND_URL);
    }
);

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
            res.json({
            id: req.user.id,
            username: req.user.username,
            displayName: req.user.displayName,
            emails: req.user.emails,
            photos: req.user.photos
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

app.get('/auth/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        req.session.destroy(function(err) {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error destroying session' });
        }
            res.clearCookie('shopi.sid'); 
            res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});




