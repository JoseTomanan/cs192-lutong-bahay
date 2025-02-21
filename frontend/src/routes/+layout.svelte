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
    <div class="flex">
        <Navbar />
        <main class="p-12 flex-1 ml-64 min-h-screen
		bg-gradient-to-tl from-white to-gray-50">
            {@render children()}
        </main>
    </div>
{:else}
    {@render children()}
{/if}
  