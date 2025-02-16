<style> 
  * {
    font-family: "Inter" 
  }
</style> 


<script lang="ts">
  import RecipeCard from '$lib/components/RecipeCard.svelte'
  
  async function searchRecipes() {
    // currently hardcoded; this should make a request to the backend
    recipes = [
      {name: 'Sinigang', ingredients: 'pork, tomatoes, onion, kangkong, gabi', cooking_time: '45 minutes', price: 'Php 800'},
      {name: 'Tinola', ingredients: 'chicken, sayote, ginger, malunggay', cooking_time: '40 minutes', price: 'Php 600'},
      {name: 'Sisig', ingredients: 'pork face, onion, chili, calamansi', cooking_time: '35 minutes', price: 'Php 450'},
      {name: 'Bicol Express', ingredients: 'pork, coconut milk, chili, bagoong', cooking_time: '50 minutes', price: 'Php 550'},
      {name: 'Kare-kare', ingredients: 'oxtail, peanut butter, eggplant, pechay', cooking_time: '2 hours', price: 'Php 900'},
      {name: 'Pinakbet', ingredients: 'squash, okra, eggplant, bitter gourd, bagoong', cooking_time: '30 minutes', price: 'Php 350'},
      {name: 'Dinuguan', ingredients: 'pork blood, meat, garlic, chili', cooking_time: '1 hour', price: 'Php 450'},
      {name: 'Laing', ingredients: 'dried taro leaves, coconut milk, chili, dried fish', cooking_time: '45 minutes', price: 'Php 400'},
      {name: 'Bulalo', ingredients: 'beef shank, corn, potatoes, pechay', cooking_time: '3 hours', price: 'Php 1200'},
      {name: 'Palabok', ingredients: 'rice noodles, shrimp sauce, tofu, shrimp', cooking_time: '40 minutes', price: 'Php 500'},
      {name: 'Kaldereta', ingredients: 'goat meat, liver spread, potatoes, carrots', cooking_time: '2 hours', price: 'Php 850'},
      {name: 'Ginataang Manok', ingredients: 'chicken, coconut milk, ginger, green chili', cooking_time: '50 minutes', price: 'Php 600'},
      {name: 'Inihaw na Liempo', ingredients: 'pork belly, soy sauce, calamansi, garlic', cooking_time: '1 hour', price: 'Php 550'},
      {name: 'Ginisang Munggo', ingredients: 'mung beans, spinach, garlic, pork', cooking_time: '45 minutes', price: 'Php 300'},
      {name: 'Mechado', ingredients: 'beef, potatoes, carrots, tomato sauce', cooking_time: '1.5 hours', price: 'Php 750'},
      {name: 'Pancit Canton', ingredients: 'egg noodles, chicken, vegetables, soy sauce', cooking_time: '30 minutes', price: 'Php 400'},
      {name: 'Binagoongang Baboy', ingredients: 'pork, bagoong, eggplant, chili', cooking_time: '1 hour', price: 'Php 500'},
      {name: 'Pinapaitan', ingredients: 'goat innards, bile, ginger, garlic', cooking_time: '1.5 hours', price: 'Php 600'},
      {name: 'Ginataang Kuhol', ingredients: 'snails, coconut milk, malunggay, chili', cooking_time: '45 minutes', price: 'Php 400'},
      {name: 'Pinangat', ingredients: 'tuna, gabi leaves, coconut milk, chili', cooking_time: '1 hour', price: 'Php 450'}
    ]
  }

  let recipes = []
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="p-10 border space-y-5">
  <form on:submit|preventDefault={searchRecipes} class="max-w-md"> 
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex  ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            </svg>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </div>
        <input 
          type="search" 
          id="default-search" 
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-secondary focus:ring-0"
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
