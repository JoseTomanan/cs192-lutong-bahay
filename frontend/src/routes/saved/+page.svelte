<script lang="ts">
  let username = "testuser"
  import { usernameStore } from "$lib/stores/auth";
  import toast, { Toaster } from 'svelte-french-toast';
  import Cookies from "js-cookie"
  import { onMount } from "svelte";
  import RecipeCard from "$lib/components/RecipeCard.svelte";


  interface IngredientObject {
    ingredientName: string;
  }

  let loading = false 
  let userId: String | undefined;
  userId = Cookies.get('user_id');

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

  let recipes: RecipeObject[] = []

  async function fetchSavedRecipes() {
    loading = true

    try {
      const response = await fetch('http://localhost:8000/api/savedby/user-get-saved-recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userId": userId
        })
      });
      const data: RecipeObject[] = await response.json()
      recipes = data
  
    } catch {
      toast.error("Error in fetching recipe.")
    }

    loading = false
  }

  onMount(async() => {
    fetchSavedRecipes()
  })
</script>

<Toaster />

<h1 class="title-text">Saved</h1>

<div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{#each recipes as recipe}
  <RecipeCard {...recipe} />
{/each}
</div>
