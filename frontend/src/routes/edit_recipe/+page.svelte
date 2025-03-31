<script lang="ts">
  import TitleText from "$lib/components/TitleText.svelte";
  import DeleteRecipe from "$lib/components/DeleteRecipe.svelte";

  let username: string = "Admin";
  let userSearchbar: string = "";

  let recipeName: string = ""
  let cookDifficulty: string = ""
  let price: string = ""
  let ingredients: string = ""
  let equipment: string = ""
  let servings: number = 0
  let instructions: string = ""

  async function handleEditRecipe() {
    try {
      const response = await fetch("http://localhost:8000/api/recipes/update-recipe/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        recipeName,
        cookDifficulty,
        servings,
        equipment,
        "ingredients": ingredients.split(","), // THIS IS CASE SENSITIVE; INGREDIENTS HAVE TO BE LOWER CASE
        instructions,
        price,
        "ratings": 0
        })
      });

      const data = await response.json();
      
      console.log(data)
  
      if (response['status'] == 200) {
        alert("Recipe edited successfully!");
        
        // Reset form fields
        recipeName = ""
        cookDifficulty = ""
        price = ""
        ingredients = ""
        equipment = ""
        servings = 0
      }
      
      else {
        alert(data.message || "Error in editing recipe")
      }
    }
    
    catch (err) {
      alert("Error connecting to the server.");
    }
  }
</script>

<TitleText text="Delete a recipe" />

<DeleteRecipe />

<hr class="my-5">

<TitleText text="Edit a recipe" />
<form on:submit|preventDefault={handleEditRecipe} class="space-y-4 mt-4">
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
    Edit Recipe
  </button>
</form>