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
  async function addRecipe() { 
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
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="flex gap-2">
<div class="space-y-5 w-1/3">
  <form on:submit|preventDefault={fetchRecipes} class="max-w-md"> 
  </form> 
</div>
<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  



