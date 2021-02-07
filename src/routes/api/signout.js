import supabase from '../../supabase';

export async function post(req, res) {
	if (req.method == 'POST') {
		const { supaToken } = req.cookies;
		const { error } = await supabase.auth.api.signOut(supaToken);

		if (error) {
			console.log('Error signing out: ', error.name, error.message);
			return res.end(JSON.stringify({ success: false }));
		}

		res.clearCookie('supaToken');
		res.clearCookie('supaRefresh', { path: '/api/refresh' });
		res.clearCookie('supaRemember');
		return res.end(JSON.stringify({ success: true }));
	}
}
