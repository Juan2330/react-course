require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const MemoryStore = require('memorystore')(session);

const app = express();

app.set('trust proxy', 1);
app.enable('trust proxy');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Set-Cookie']
};
app.use(cors(corsOptions));

app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
        sameSite: 'none',
        domain: process.env.NODE_ENV === 'production' 
            ? '.railway.app' 
            : undefined
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    proxy: true,
    scope: ['user:email']
    }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    (null, user);
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/my-account`);
    }
);

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
        id: req.user.id,
        username: req.user.username || req.user.displayName,
        email: req.user.emails?.[0]?.value,
        photos: req.user.photos
        });
    }
    res.status(401).json({ message: 'Not authenticated' });
});

app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid', {
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.railway.app' : undefined
        });
        res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});