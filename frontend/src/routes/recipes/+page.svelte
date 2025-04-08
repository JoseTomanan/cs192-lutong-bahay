<script lang="ts">
  import { onMount } from 'svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import RecipesLoader from '$lib/components/RecipesLoader.svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { recipesStore, recipesLoaded } from '$lib/stores/recipes';

  let recipes = [];
  let filteredRecipes = [];
  let recipeName = '';
  let direction = 'ascending';
  let sort = 'recipeName';
  let ingredients = '';
  let loading = false;

  onMount(async () => {
    if (!$recipesLoaded) {
      await fetchAllRecipes();
    } else {
      recipes = $recipesStore;
      filteredRecipes = [...recipes];
    }
  });

  async function fetchAllRecipes() {
    loading = true;
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/get-recipes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.hasOwnProperty('error')) {
        toast.error('No recipes found');
      } else {
        recipesStore.set(data); // Cache recipes in the store
        recipesLoaded.set(true); // Mark recipes as loaded
        recipes = data;
        filteredRecipes = [...recipes];
      }
    } catch {
      toast.error('No database connection');
    } finally {
      loading = false;
    }
  }

  function searchRecipes() {
    filteredRecipes = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(recipeName.toLowerCase())
    );
    sortRecipes(); // Ensure the filtered results are sorted
  }

  function filterByIngredients() {
    const ingredientList = ingredients.split(',').map((i) => i.trim().toLowerCase());
    filteredRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredientList.includes(ingredient.ingredientName.toLowerCase())
      )
    );
    sortRecipes(); // Ensure the filtered results are sorted
  }

  function sortRecipes() {
    filteredRecipes = [...filteredRecipes].sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === 'ascending' ? aValue - bValue : bValue - aValue;
    });
  }
</script>

<Toaster />

<div class="flex gap-2">
  <!-- Search Recipes -->
  <div class="space-y-5 w-1/3">
    <label for="search" class="mb-2 text-sm font-medium text-black sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-dark_gray"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        ></svg>
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 text-sm rounded border focus:outline-gray-700 focus:ring-0"
        bind:value={recipeName}
        placeholder="Search Recipes..."
        on:input={searchRecipes}
      />
    </div>
  </div>

  <!-- Filter by Ingredients -->
  <div class="space-y-5 w-1/3">
    <label for="filter" class="mb-2 text-sm font-medium text-black sr-only">Filter</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-dark_gray"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        ></svg>
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </div>
      <input
        type="search"
        id="filter-ingredients"
        class="block w-full p-4 text-sm rounded border focus:outline-gray-700 focus:ring-0"
        bind:value={ingredients}
        placeholder="Filter by ingredient..."
        on:change={filterByIngredients}
      />
    </div>
  </div>

  <!-- Sort Recipes -->
  <select
    bind:value={sort}
    on:change={() => sortRecipes()}
    class="bg-white border border-gray-200 text-gray-700 text-sm rounded focus:ring-main focus:border-2 focus:border-gray-700 block w-3/12 p-2.5"
  >
    {#each ['id', 'recipeName', 'price', 'cookDifficulty', 'ratings'] as sortMethod}
      <option value={sortMethod}>Sort by {sortMethod}</option>
    {/each}
  </select>

  <select
    bind:value={direction}
    on:change={() => sortRecipes()}
    class="bg-white border border-gray-200 text-gray-700 text-sm rounded focus:ring-main focus:border-2 focus:border-gray-700 block w-3/12 p-2.5"
  >
    {#each ['ascending', 'descending'] as sortMethod}
      <option value={sortMethod}>{sortMethod}</option>
    {/each}
  </select>
</div>

<!-- Recipes List -->
{#if loading}
  <div class="h-full flex flex-col items-center justify-center gap-4">
    <RecipesLoader />
    <span class="text-gray-400 text-md">Loading recipes...</span>
  </div>
{:else}
  <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredRecipes as recipe}
      <RecipeCard {...recipe} />
    {/each}
  </div>
{/if}