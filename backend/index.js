require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
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
    res.redirect('http://localhost:5173');
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
            res.clearCookie('connect.sid'); 
            res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




