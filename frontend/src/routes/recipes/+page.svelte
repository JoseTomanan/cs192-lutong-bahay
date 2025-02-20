<style> 
  * {
    font-family: "Inter" 
  }
</style> 


<script lang="ts">
  import { onMount } from 'svelte'
  import RecipeCard from '$lib/components/RecipeCard.svelte'
  let recipes = []

  async function fetchRecipes() {
		const response = await fetch('http://127.0.0.1:8000/api/recipes/get-recipes/');
		recipes = await response.json();
	}

  fetchRecipes()
  

</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

{#if recipes === []}
<div class="border"></div>
{:else}
<div class="space-y-5">
  <form on:submit|preventDefault={fetchRecipes} class="max-w-md"> 
    <label for="search" class="mb-2 text-sm font-medium text-black sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex  ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-dark_gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            </svg>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </div>
        <input 
          type="search" 
          id="default-search" 
          class="block w-full p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"

          placeholder="Search Recipes..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-main hover:bg-main_dark font-medium rounded-lg text-sm px-4 py-2">Search</button>
    </div>
  </form> 

<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each recipes as recipe}
      <RecipeCard {...recipe} />
  {/each}
</div>

</div>
{/if}
