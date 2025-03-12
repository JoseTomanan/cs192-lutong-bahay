<style> 
  * {
    font-family: "Inter" 
  }
</style> 


<script lang="ts">
  import { onMount } from 'svelte'
  import RecipeCard from '$lib/components/RecipeCard.svelte'
  let recipes = []
  let recipeName = '' 
  let direction = 'ascending'
  let is_negative = true
  let sort= 'recipeName'
 
  let ingredients = ''

  async function fetchRecipes() { 
    console.log(recipeName)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/get-recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({recipeName})
      })

      const data = await response.json()
      if (data.hasOwnProperty('error')) {
        alert('No recipes found')
      } else {
        recipes = [data] 
        console.log(data)
        console.log(recipes.length)
      }
    } catch { 
      alert('No database connection')
    } 
	}

  async function fetchByIngredients() { 
    console.log(recipeName)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/sort-recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"sort": sort, "is_negative": is_negative, "ingredients": ingredients.split(", ")})
      })

      const data = await response.json()
      if (data.hasOwnProperty('error')) {
        alert('No recipes found')
      } else {
        recipes = data 
        console.log(data)
        console.log(recipes.length)
      } 
    } catch { 
      alert('No database connection')
    }  
	}


  async function sortRecipes() { 
    console.log(sort)
    try {
      is_negative = direction == 'ascending' ? true : false
      const response = await fetch('http://127.0.0.1:8000/api/recipes/sort-recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({is_negative, sort})
      }) 

      console.log(JSON.stringify({sort}))
      const data = await response.json()
      recipes = data 
      console.log(recipes) 
    } catch {
      alert('No database connection')
    } 
  }
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="flex gap-2">
<div class="space-y-5 w-1/3">
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
          bind:value={recipeName}
          placeholder="Search Recipes..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-main hover:bg-main_dark font-medium rounded-lg text-sm px-4 py-2">Search</button>
    </div> 
  </form> 
</div>

<div class="space-y-5 w-1/3"> 
  <form on:submit|preventDefault={fetchByIngredients} class="max-w-md"> 
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
          bind:value={ingredients}   
          placeholder="Filter by ingredient..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2">Filter</button>
    </div> 
  </form> 
</div>

<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->
<select
  bind:value={sort} 
  on:change={() => sortRecipes()}
  class="bg-white border border-gray-200 text-gray-700 text-sm rounded focus:ring-main focus:border-2 focus:border-gray-700 block w-3/12 p-2.5">

  {#each ['id', 'recipeName', 'price', 'cookDifficulty', 'ratings'] as sortMethod}
    <option value={sortMethod}>sort by {sortMethod}</option>
  {/each} 
</select>

<select
  bind:value={direction}  
  on:change={() => sortRecipes()} 
  class="bg-white border border-gray-200 text-gray-700 text-sm rounded focus:ring-main focus:border-2 focus:border-gray-700 block w-3/12 p-2.5">

  {#each ['ascending', 'descending'] as sortMethod} 
    <option value={sortMethod}>sort by {sortMethod}</option>
  {/each} 
</select> 
 


</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  

<div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each recipes as recipe}
      <RecipeCard {...recipe} /> 
  {/each} 
</div>



