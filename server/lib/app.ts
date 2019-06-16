import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import express from 'express';
import helmet from 'helmet';

const { NODE_ENV, SESSION_SECRET = '' } = process.env;

export const app = express();

app.set('env', NODE_ENV);
app.set('trust proxy', true);

app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    // prettier-ignore
    keys: [SESSION_SECRET],
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    name: '__session',
    sameSite: true,
    secure: NODE_ENV === 'production',
    signed: true,
  }),
);
