<script lang="ts">
  let recipeName = ""
  let isLoading = false

  function getCookie(name: string) {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()!.split(';').shift()
    }
  }
  
  async function deleteRecipe() {
    try {
      const response = await fetch('http://localhost:8000/api/recipes/del-recipe/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie("csrftoken"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipeName})
      });
      
      alert(`${recipeName} deleted`)
    }
    
    catch {
      alert(`failed to delete ${recipeName}`)
    } 
  }
</script>

<div class="max-w-md mt-6 p-6 bg-white rounded-lg border-2">
  <h2 class="text-xl font-semibold mb-4">
    Recipe Management
  </h2>
  
  <div class="mb-4">
    <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
    <input 
      id="username"
      type="text" 
      bind:value={recipeName}
      placeholder="Enter Recipe"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  
  <div class="flex space-x-4">
    <button 
      on:click={deleteRecipe}
      disabled={isLoading}
      class="destructive-text"
    >Delete Recipe</button>
  </div>
  
  {#if isLoading}
    <div class="mt-4 text-center text-gray-500">
      Processing...
    </div>
  {/if}
</div>