import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import supabase from './supabase';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(cookieParser())
	.use(json())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: async (req, res) => {
				// If there's a JWT, check if it's valid
				const results = await supabase.auth.api.getUser(req.cookies['supaToken']);
				if (results.user) {
					return { userToken: req.cookies['supaToken'] };
				}
				return { userToken: false };
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
