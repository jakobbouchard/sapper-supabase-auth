import supabase from '../../supabase';

export async function post(req, res) {
	if (req.method == 'POST' && req.cookies['supaRefresh']) {
		const refreshToken = req.cookies['supaRefresh'];
		const remember = req.cookies['supaRemember'];
		const { data, error } = await supabase.auth.api.refreshAccessToken(refreshToken);

		if (error) {
			console.log('Error refreshing token: ', error.name, error.message);
			return res.end(JSON.stringify({ supaToken: false }));
		}

		if (data) {
			const tokenExpires = remember ? new Date(Date.now() + data.expires_in * 1000) : 0;
			const refreshExpires = remember ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : 0;
			const cookieOptions = { httpOnly: true, secure: false, sameSite: 'strict' };

			res.cookie('supaToken', data.access_token, { expires: tokenExpires, ...cookieOptions });
			res.cookie('supaRefresh', data.refresh_token, { expires: refreshExpires, path: '/api/refresh', ...cookieOptions });
			if (remember) {
				res.cookie('supaRemember', 1, { expires: refreshExpires, ...cookieOptions });
			}

			return res.end(JSON.stringify({ supaToken: data.access_token }));
		}

		return res.end(JSON.stringify({ supaToken: false }));
	}
}
