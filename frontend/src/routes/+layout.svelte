<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { isAuthenticated } from '$lib/stores/auth'

	let { children } = $props();
</script>

{#if $isAuthenticated}
	<Navbar />
{/if}

{@render children()}
  