import supabase from '../../supabase';

export async function post(req, res) {
	if (req.method == 'POST') {
		const { email, password, remember, authType } = req.body;
		let userData;

		switch (authType) {
			case 'signin':
				userData = await supabase.auth.api.signInWithEmail(email, password);
				break;

			case 'signup':
				userData = await supabase.auth.api.signUpWithEmail(email, password);
				break;
		}

		const { data, error } = userData;

		if (error) {
			console.log('Error signing in: ', error.name, error.message);
			return res.end(JSON.stringify({ success: false }));
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

			return res.end(JSON.stringify({ success: true }));
		}

		return res.end(JSON.stringify({ success: false }));

	}
}