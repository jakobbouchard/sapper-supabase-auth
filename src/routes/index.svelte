<script>

async function authenticate(event, authType) {
	const { email, password, remember } = event.target.elements;

	const authAPI = await fetch('/api/auth', {
		method: 'POST',
		credentials: 'same-origin',
		body: JSON.stringify({
			email: email.value,
			password: password.value,
			remember: remember.checked,
			authType: authType
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const { success } = await authAPI.json();
	if (success) {
		window.location.href = '/dashboard';
	}
}
</script>

<style>
	* {
		margin: 0 auto;
	}

	section:not(:last-child) {
		margin-bottom: 4em;
	}

	h1 {
		margin: 0.5em 0;
		font-size: 2.8em;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}

	form {
		width: 50%;
	}

	input:not([type="checkbox"]) {
		display: block;
		width: 100%;
		margin-bottom: 0.25em;
		padding: 0.5em;
		border-radius: 0.5em;
		border: 1px #999 solid;
	}

	label {
		display: block;
	}

	button {
		width: 100%;
		margin-top: 1em;
		padding: 0.5em;
		border-radius: 0.25em;
		border: 2px rgb(255,62,0) solid;
		background-color: rgba(255,62,0,0.1);
		color: rgb(255,62,0);
		font-size: medium;
		transition: background-color 0.1s ease-in-out;
	}

	button:hover {
		background-color: rgba(255,62,0,0.2);
		cursor: pointer;
	}

</style>

<svelte:head>
	<title>Sapper Supabase Auth</title>
</svelte:head>

<section>
	<h1>Sign in</h1>
	
	<form on:submit|preventDefault={ (e) => authenticate(e, 'signin') } >
		<input id="email" type="email" placeholder="Email address">
		<input id="password" type="password" placeholder="Password">
		<label for="remember">
			<input id="remember" type="checkbox">
			Remember me
		</label>
		<button type="submit">Sign in</button>
	</form>
</section>

<hr>

<section>
	<h1>Sign up</h1>
	
	<form on:submit|preventDefault={ (e) => authenticate(e, 'signup') } >
		<input id="email" type="email" placeholder="Email address">
		<input id="password" type="password" placeholder="Password">
		<label for="remember">
			<input id="remember" type="checkbox">
			Remember me
		</label>
		<button type="submit">Sign up</button>
	</form>
</section>
