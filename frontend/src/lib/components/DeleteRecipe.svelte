<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import DefaultLoader from './DefaultLoader.svelte';

  let recipeName = ""
  let loading: boolean = false
  let loadingText: string = "Deleting recipe..."

  function getCookie(name: string) {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()!.split(';').shift()
    }
  }
  
  async function deleteRecipe() {
    loading = true
    try {
      const response = await fetch('http://localhost:8000/api/recipes/del-recipe/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") && { 'X-CSRFToken': getCookie("csrftoken") }),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipeName})
      });
      
      toast.success(`${recipeName} deleted`)
    }
    
    catch {
      toast.error(`failed to delete ${recipeName}`)
    } finally {
      loading = false
    }
  }
</script>

<Toaster/>

<div class="max-w-md mt-8 p-6 bg-white rounded-lg border-2 space-y-6">
  <h2 class="text-lg font-semibold mb-4">
    Delete a recipe
  </h2>
  
  <div class="space-y-4">
    <div class="space-y-2">
      <label for="username" class="block text-sm font-medium text-gray-700">
        Enter recipe name
      </label>
      <input
        id="username"
        type="text"
        bind:value={recipeName}
        placeholder="Enter recipe name..."
        class="md-text-field"
      />
    </div>
    
    <div class="flex justify-end">
      <button
        on:click={deleteRecipe}
        class="destructive-text"
      >Delete</button>
    </div>
  </div>
  

{#if loading}
  <div class="flex flex-col items-center justify-center mt-4 space-y-2">
    <DefaultLoader />
    <span class="text-gray-500 text-sm">{loadingText}</span>
  </div>
{/if}

</div>