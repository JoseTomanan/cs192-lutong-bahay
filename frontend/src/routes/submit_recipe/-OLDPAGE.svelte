<script lang="ts">

  let username = "Admin";
  let userSearchbar = "";

  let recipeName = "";
  let cookDifficulty = "";
  let price = "";
  let ingredients: string = ""
  let equipment = "";
  let servings = 0;
  let instructions = ""

  async function handleAddRecipe() {
    
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
      const response = await fetch("http://localhost:8000/api/recipes/add-recipe/", {
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

<h1 class="title-text">Add a recipe</h1>

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
  >Add Recipe</button>
</form>