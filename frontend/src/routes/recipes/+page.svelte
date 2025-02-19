<style> 
  * {
    font-family: "Inter" 
  }
</style> 


<script lang="ts">
  import RecipeCard from '$lib/components/RecipeCard.svelte'
  let recipes = []
  let searchQuery = ''

  async function fetchRecipes() {
    console.log('hello')
    try {
      const response = await fetch('http://localhost:8000/api/recipes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({searchQuery})
      })
      const data = await response.json()
      recipes = data.recipes 
    
    } catch { 
      console.log('2')
    }
  }

  
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="p-10 space-y-5">
  <form on:submit|preventDefault={fetchRecipes} class="max-w-md"> 
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex  ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            </svg>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </div>
        <input 
          bind:value={searchQuery}
          type="search" 
          id="default-search" 
          class="block w-full p-4 ps-10 text-sm text-gray-900 border  rounded-lg bg-white focus:outline-secondary focus:ring-0"
          placeholder="Search Recipes..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-main hover:bg-main_dark font-medium rounded-lg text-sm px-4 py-2">Search</button>
    </div>
  </form> 

<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  

<div class="grid grid-cols-4 gap-4">
  {#each recipes as recipe}
      <RecipeCard {...recipe} />
  {/each}
</div>

</div>
