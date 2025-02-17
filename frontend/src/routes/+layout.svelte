<script lang="ts">
	import '../app.css'
	import Navbar from '$lib/components/Navbar.svelte'
	import { isAuthenticated } from '$lib/stores/auth'
	import { page } from '$app/state'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
	import { initAuth } from '$lib/stores/auth' 
	
	onMount(() => {
        initAuth()
    });

	let { children } = $props()
</script>

{#if $isAuthenticated}
	<Navbar />
{/if}

{@render children()}
  