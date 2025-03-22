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
 
  let ingredients = [{
    ingredientName: "Hotdog"
  }]
  let ingredientName = '';

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
  
  // https://svelte.dev/playground/9983c53df057451db328b94553b88202?version=5.25.2
  const addIngredient = () => {
    ingredients = [
      ...ingredients, {
        ingredientName,
      }
    ];
    ingredientName="";
  }

  const removeIngredient = ingredient => {
    ingredients = ingredients.filter(i => i!== ingredient)
  };
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="flex gap-2">
<div class="space-y-5 w-1/3">
  <!-- Add to list of ingredients -->
  <form on:submit|preventDefault={addIngredient} class="max-w-md"> 
    <label for="ingredientName">Add ingredient</label>
    <input id="ingredientName" type="text" bind:value={ingredientName} />
  </form> 

  <!-- Display ingredients -->
  <div>
    {#each ingredients as ingredient}
        <p>{ingredient.ingredientName}</p>
        <button on:click={() => removeIngredient(ingredient)}> Remove {ingredient.ingredientName}</button>
    {/each}
  </div>

  <!-- Submit ingredients -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  



