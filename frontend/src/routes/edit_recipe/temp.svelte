<script>
	import TitleText from "$lib/components/TitleText.svelte";

  let isRecipeReturned = true



  let username = "Admin";
  let userSearchbar = "";

  let recipeName = "";
  let cookDifficulty = "";
  let price = "";
  let ingredients = []
  let equipment = "";
  let servings = 0;
  let instructions = ""

  async function handleEditRecipe() {
    try {
        // const toSend = JSON.stringify({
        //     "recipeName": recipeName,
        //     "cookDifficulty": cookDifficulty,
        //     "servings": servings,
        //     "equipment": equipment,
        //     "ingredients": ingredients.split(", "),
        //     "instructions": "",
        //     "ratings": 0,
        //     "price": price,
        // })
        const response = await fetch("http://localhost:8000/api/recipes/edit-recipe/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            recipeName,
            cookDifficulty,
            servings,
            equipment,
			      "ingredients": ingredients.split(","),
            instructions,
            price,s
            "ratings": 0
            })
        });
        const data = await response.json();
        console.log(data)
    
        if (response['status'] == 200) {
            alert("Recipe added successfully!");
            // Reset form fields
            recipeName = "";
            cookDifficulty = "";
            price = "";
            ingredients = "";
            equipment = "";
            servings = 0;
        } else {
            alert(data.message || "Failed to add recipe.");
        }
    } catch (err) {
        alert("Error connecting to the server.");
    }
  }
</script>

<TitleText text={`Edit recipes`}/>

<form class="space-y-4 mt-4">
  <div class="relative w-1/2">
    <input 
      type="search" 
      id="default-search"
      class="block w-full p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      placeholder="Name of recipe..."
      required
    />

    <button
      type="submit"
      class="text-white absolute end-2.5 bottom-2.5 bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2"
    >Retrieve recipe</button>
  </div>

  {#if isRecipeReturned}
    <div
      class="flex"
    >
      <!--
        all the same components as submit recipes
        but only displays when recipe is in fact returned
        I'll let you do the honors of copy pasting from submit_recipe para hindi ka mamalik mata and shit
      -->

      <div>
        <button 
          type="submit" 
          class="rounded bg-gray-600 hover:shadow-md p-2 text-white hover:bg-gray-700"
        >Update recipe</button>
        <button 
          type="submit" 
          class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >Delete Recipe</button>
      </div>
    </div>
  {/if}
</form>

<form on:submit|preventDefault={handleAddRecipe} class="space-y-4 mt-4">
  <input 
      type="text" 
      class="block w-1/3 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={recipeName}
      placeholder="Recipe Name..." 
  />

  <input 
      type="text" 
      class="block w-1/6 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={cookDifficulty}
      placeholder="Cooking Difficulty..." 
      
  />

  <input 
      type="number" 
      class="block w-1/6 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={price}
      placeholder="Price..." 
      
  />

  <input 
      type="text" 
      class="block w-1/3 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={ingredients}
      placeholder="Ingredients (comma-separated)..." 
      
  />

  <input 
      type="text" 
      class="block w-1/3 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={instructions}
      placeholder="Instructions" 
      
  />

  <input 
      type="text" 
      class="block w-1/3 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={equipment}
      placeholder="Equipment..." 
      
  />

  <input 
      type="number" 
      class="block w-1/6 p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      bind:value={servings}
      placeholder="Servings..." 
     
  />

  <button 
      type="submit" 
      class="w-1/6 rounded bg-main hover:shadow-md p-2 text-white hover:bg-main_dark"
  >
      Add Recipe
  </button>
</form>