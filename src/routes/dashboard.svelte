<script context="module">
	export async function preload(page, session) {
		let { userToken } = session;
		if (!userToken) return this.redirect(302, '/');
		return userToken;
	}
</script>

<script></script>

<style>
	* {
		margin: 0 auto;
	}

	h1 {
		margin: 0.5em 0;
		font-size: 2.8em;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
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

<h1>Our very cool dashboard</h1>

<button>Sign out</button>