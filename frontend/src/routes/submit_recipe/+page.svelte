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

  let ingredientsDb;
 
  let recipeName = "";
  let cookDifficulty = 0;
  let instructions = "";
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

  onMount(async () => {
    fetchIngredients()
  })

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

  async function fetchIngredients() { 
    console.log(recipeName)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/get_ingredients/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }, 
      })

      const data = await response.json()
      if (data.hasOwnProperty('error')) {
        alert('No recipes found')
      } else {
        const result = data
        ingredientsDb = result.map((val) => {
          return {id: val.id, ingredientName: val.ingredientName}
        })
        console.log(ingredientsDb)
      }
    } catch { 
      alert('No database connection')
    } 
	}

  async function submitRecipe() {
    let input = {
      recipeName: recipeName,
      cookDifficulty: cookDifficulty,
      equipment: equipment.toString(),
      instructions: instructions,
      servings: servings,
      price: price,
      ratings: 0
    }

    console.log(JSON.stringify(input))
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

  <!-- https://v1.tailwindcss.com/components/forms -->
<form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="recipeName">
        Recipe name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="recipeName" type="text" placeholder="Recipe name" bind:value={recipeName}>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="servings">
        Servings
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="servings" type="text" placeholder="Servings" bind:value={servings}>
    </div>
    <div class="w-full md:w-1/3 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
        Price
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="text" placeholder="Price" bind:value={price}>
    </div>
    <div class="w-full md:w-1/3 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cookDifficulty">
        Difficulty
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cookDifficulty" type="text" placeholder="Diffuclty" bind:value={cookDifficulty}>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="instructions">
        Instructions
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="instructions" type="text" placeholder="Instructions" bind:value={instructions}>
    </div>
  </div>
</form>

  <!-- Add to list of ingredients -->
  <form on:submit|preventDefault={addIngredient} class="max-w-md"> 
    <label for="ingredientName">Add ingredient</label>
    <!-- <input id="ingredientName" type="text" bind:value={ingredientName} /> -->
     <select bind:value={ingredientName}>
        {#each ingredientsDb as ingredient}
          <option> {ingredient.ingredientName} </option>
        {/each}
     </select>
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
   <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" on:click={submitRecipe}>Submit Recipe</button>

</div>
<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->

</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->  



