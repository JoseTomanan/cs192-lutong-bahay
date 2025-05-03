<script lang="ts">
  import { onMount } from 'svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import RecipesLoader from '$lib/components/RecipesLoader.svelte';

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  interface IngredientObject {
    ingredientName: string;
  }

  interface RecipeObject {
    cookDifficulty: string;
    ratings: number;
    price: number;
    ingredients: IngredientObject[];
    id: number;
    recipeName: string;
    equipment: string;
    servings: number;
  }

  let recipes: RecipeObject[] = [];
  let filteredRecipes: RecipeObject[] = [];
  let recipeName = '';
  let direction: 'ascending' | 'descending' = 'ascending';
  let sort: keyof RecipeObject = 'recipeName';
  let ingredients = '';
  let loading = false;

  onMount(async () => {
    await fetchAllRecipes();
  });

  async function fetchAllRecipes() {
    loading = true;
    try {
      const response = await fetch(`${baseUrl}/api/recipes/get-recipes/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: RecipeObject[] = await response.json();
      if (data.hasOwnProperty('error')) {
        alert('No recipes found');
      } else {
        recipes = data;
        filteredRecipes = [...recipes];
      }
    } catch {
      alert('No database connection');
    } finally {
      loading = false;
    }
  }

  function searchRecipes() {
    filteredRecipes = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(recipeName.toLowerCase())
    );
    sortRecipes();
  }

  function filterByIngredients() {
    const ingredientList = ingredients.split(',').map((i) => i.trim().toLowerCase());
    filteredRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredientList.includes(ingredient.ingredientName.toLowerCase())
      )
    );
    sortRecipes();
  }

  function sortRecipes() {
    filteredRecipes = [...filteredRecipes].sort((a, b) => {
      const aValue = a[sort as keyof RecipeObject];
      const bValue = b[sort as keyof RecipeObject];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === 'ascending' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    });
  }
</script>

<div class="flex flex-wrap gap-4 items-center mb-4">
  <!-- Search Recipes -->
  <div class="flex-1">
    <label for="search" class="sr-only">Search Recipes</label>
    <div class="relative">
      <input
        type="search"
        id="default-search"
        class="block w-full p-3 text-sm rounded-lg border border-gray-300 focus:ring-main focus:border-main"
        bind:value={recipeName}
        placeholder="Search Recipes..."
        on:input={searchRecipes}
      />
    </div>
  </div>

  <!-- Filter by Ingredients -->
  <div class="flex-1">
    <label for="filter" class="sr-only">Filter by Ingredients</label>
    <div class="relative">
      <input
        type="search"
        id="filter-ingredients"
        class="block w-full p-3 text-sm rounded-lg border border-gray-300 focus:ring-main focus:border-main"
        bind:value={ingredients}
        placeholder="Filter by Ingredients (comma-separated)..."
        on:change={filterByIngredients}
      />
    </div>
  </div>

  <!-- Sort Recipes -->
  <div class="flex gap-2">
    <select
      bind:value={sort}
      on:change={() => sortRecipes()}
      class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-main focus:border-main p-3 h-[44px]"
    >
      {#each ['id', 'recipeName', 'price', 'cookDifficulty', 'ratings'] as sortMethod}
        <option value={sortMethod}>Sort by {sortMethod}</option>
      {/each}
    </select>

    <select
      bind:value={direction}
      on:change={() => sortRecipes()}
      class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-main focus:border-main p-3 h-[44px]"
    >
      {#each ['ascending', 'descending'] as sortMethod}
        <option value={sortMethod}>{sortMethod}</option>
      {/each}
    </select>
  </div>
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