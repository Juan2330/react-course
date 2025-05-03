require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const { Pool } = require('pg');
const PgStore = require('connect-pg-simple')(session);

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || 'https://shopi-backend.onrender.com/auth/github/callback';

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
];

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function createSessionsTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                sid VARCHAR PRIMARY KEY,
                sess JSON NOT NULL,
                expire TIMESTAMP NOT NULL
            );
        `);
        console.log('Tabla user_sessions verificada/creada');
    } catch (err) {
        console.error('Error al crear user_sessions:', err);
    }
}
createSessionsTable();

async function startServer() {
    try {
        app.set('trust proxy', 1);

        app.use(cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
        }));

        app.use(session({
            store: new PgStore({
                conString: process.env.DATABASE_URL,
                pool: pool, 
                tableName: 'user_sessions'
            }),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: GITHUB_CALLBACK_URL,
            proxy: true,
            scope: ['user:email'],
            passReqToCallback: true
        }, (req, accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });
        
        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        app.get('/auth/github/callback', passport.authenticate('github', {
            failureRedirect: '/',
            }), (req, res) => {
                res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
        });

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

        app.get('/auth/logout', async (req, res) => {
            try {
                await req.logout();
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        return res.status(500).json({ message: 'Error destroying session' });
                    }
                    res.clearCookie('shopi.sid');
                    res.status(200).json({ message: 'Logged out successfully' });
                });
            } catch (err) {
                console.error('Error during logout:', err);
                res.status(500).json({ message: 'Error logging out' });
            }
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();