<style> 
  * {
    font-family: "Inter" 
  }
</style> 


<script lang="ts">
  import { onMount } from 'svelte'
  import RecipeCard from '$lib/components/RecipeCard.svelte'
  // let recipes = []
  // let recipeName = '' 
  // let direction = 'ascending'
  // let is_negative = true
  // let sort= 'recipeName'
 
  let recipeName = "recipeName";
  let cookDifficulty = 0;
  let instructions = "instructions";
  let servings = 1;
  let price = 20;
  let ratings = 5;


  let ingredients = [{
    ingredientName: "Hotdog",
    ingredientQuantity: 4
  }]
  let ingredientName = '';
  let ingredientQuantity = 0;

  let equipment = [{
    equipmentName: "Pan",
    equipmentQuantity: 1
  }]
  let equipmentName = '';
  let equipmentQuantity = 0;

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
        ingredientQuantity
      }
    ];
    ingredientName="";
    ingredientQuantity=0;
  }

  const removeIngredient = ingredient => {
    ingredients = ingredients.filter(i => i!== ingredient)
  };

  const addEquipment = () => {
    equipment = [
      ...equipment, {
        equipmentName,
        equipmentQuantity
      }
    ];
    equipmentName="";
    equipmentQuantity=0;
  }

  const removeEquipment = equipment_i => {
    equipment = equipment.filter(i => i!== equipment_i)
  };
</script> 

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->  

<div class="flex gap-2">
<div class="space-y-5 w-1/3">
  <!-- Recipe info -->
  <input id="recipeName" type="text" bind:value={recipeName}>
  <input id="recipeName" type="text" bind:value={cookDifficulty}>
  <input id="recipeName" type="text" bind:value={instructions}>
  <input id="recipeName" type="number" bind:value={servings}>
  <input id="recipeName" type="number" bind:value={price}>
  <input id="recipeName" type="number" bind:value={ratings}>

  <!-- Add to list of ingredients -->
  <form on:submit|preventDefault={addIngredient} class="max-w-md"> 
    <label for="ingredientName">Add ingredient</label>
    <input id="ingredientName" type="text" bind:value={ingredientName} />
    <input id="ingredientQuantity" type="text" bind:value={ingredientQuantity} />
    <input type="submit">
  </form> 

  <!-- Display ingredients -->
  <ul>
    <li class="flex items-center align-text-bottom align-bottom">
      <p>ingredientName</p>
      <p class="pl-20">ingredientQuantity</p>
    </li>
    {#each ingredients as ingredient}
      <li class="flex items-center align-text-bottom align-bottom">
        <!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
        <input id="ingredientName" type="text" bind:value={ingredient.ingredientName} />
        <input id="ingredientQuantity" type="text" bind:value={ingredient.ingredientQuantity} />
        <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-0.3 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        on:click={() => removeIngredient(ingredient)}>x</button>
      </li>
    {/each}
  </ul>

  <!-- Add to list of equipment -->
  <form on:submit|preventDefault={addEquipment} class="max-w-md"> 
    <label for="equipmentName">Add equipment</label>
    <input id="equipmentName" type="text" bind:value={equipmentName} />
    <input id="equipmentQuantity" type="text" bind:value={equipmentQuantity} />
    <input type="submit">
  </form> 

  <!-- Display equipment -->
  <ul>
    <li class="flex items-center align-text-bottom align-bottom">
      <p>equipmentName</p>
      <p class="pl-20">equipmentQuantity</p>
    </li>
    {#each equipment as equipment}
      <li class="flex items-center align-text-bottom align-bottom">
        <!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
        <input id="equipmentName" type="text" bind:value={equipment.equipmentName} />
        <input id="equipmentQuantity" type="text" bind:value={equipment.equipmentQuantity} />
        <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-0.3 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        on:click={() => removeEquipment(equipment)}>x</button>
      </li>
    {/each}
  </ul>

  <!-- Submit recipe -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  



