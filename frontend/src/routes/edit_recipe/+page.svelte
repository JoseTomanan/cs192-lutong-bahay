<script lang="ts">
  import DeleteRecipe from "$lib/components/DeleteRecipe.svelte";
  import toast, { Toaster } from 'svelte-french-toast';
  import DefaultLoader from "$lib/components/DefaultLoader.svelte";

  let username: string = "Admin";
  let userSearchbar: string = "";

  let recipeName: string = ""
  let cookDifficulty: string = ""
  let price: string = ""
  let ingredients: string = ""
  let equipment: string = ""
  let servings: number = 0
  let instructions: string = ""

  let loading: boolean = false
  let loadingText: string = ""

  async function handleEditRecipe() {
    loading = true
    loadingText = "Editing the recipe..."
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
        toast.success("Recipe edited successfully!");
        
        // Reset form fields
        recipeName = ""
        cookDifficulty = ""
        price = ""
        ingredients = ""
        equipment = ""
        servings = 0
      }
      
      else {
        toast.error(data.message || "Error in editing recipe")
      }
    }
    
    catch (err) {
      toast.error("Error connecting to the server.");
    } finally {
      loading = false
    }
  }
</script>

<h1 class="title-text">Delete a recipe</h1>

<DeleteRecipe />

<hr class="my-5">

<h1 class="title-text">Edit a recipe</h1>

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

{#if loading}
  <div class="flex gap-3 items-center mt-3">
    <DefaultLoader />
    <span class="text-gray-500 text-sm">{loadingText}</span>
  </div>
{/if}